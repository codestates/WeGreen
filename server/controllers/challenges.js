const {
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  comment: CommentModel,
  checkin: CheckInModel,
  users_badge: UserBadgeModel,
  sequelize,
} = require('../models');
var express = require('express');
var router = express.Router();
const { Op } = require('sequelize'); //sequelize or 쓸때 필요합니다.
const { isAuthorized } = require('./tokenFunctions');
const moment = require('moment');

function getRandomBadge(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

module.exports = {
  //인기 챌린지 목록 불러오기 GET /challenges/popular/?query=검색어&limit=3
  popular: async (req, res) => {
    try {
      var searchModel;
      const search = req.query.query;
      if (search) {
        searchModel = await ChallengeModel.findAll({
          attributes: [
            ['id', 'challenge_id'],
            'name',
            'content',
            'started_at',
            'requirement',
            'created_at',
          ],
          raw: true,
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                content: {
                  [Op.like]: `%${search}%`,
                },
              },
            ],
          },
        });
      }
      const joinCountArray = await UserChallengeModel.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('user_id')), 'join_count'],
          'challenge_id',
        ],
        group: ['challenge_id'],
        order: [[sequelize.col('join_count'), 'DESC']],
        raw: true,
      });
      if (searchModel) {
        for (let i = 0; i < joinCountArray.length; i++) {
          for (let j = 0; j < searchModel.length; j++) {
            if (searchModel[j].id === joinCountArray[i].challenge_id) {
              searchModel[j].join_count = joinCountArray[i].join_count;
            } else {
              continue;
            }
          }
        }
      }
      const limitNum = req.query.limit || 10;
      const slicedJoinCount = joinCountArray.slice(0, limitNum);
      const popularResult = [];
      for (let i = 0; i < slicedJoinCount.length; i++) {
        await ChallengeModel.findOne({
          attributes: [
            ['id', 'challenge_id'],
            'name',
            'content',
            'started_at',
            'requirement',
            'created_at',
          ],
          where: { id: slicedJoinCount[i].challenge_id },
          raw: true,
        }).then((result) =>
          popularResult.push(
            Object.assign(result, {
              join_count: slicedJoinCount[i]['join_count'],
            })
          )
        );
      }
      res
        .status(200)
        .json({ message: 'OK', data: search ? searchModel : popularResult });
    } catch (err) {
      console.log('ERROR', err);
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //최신 챌린지 목록 불러오기 GET /latest
  latest: async (req, res) => {
    try {
      var searchModel;
      const search = req.query.query;
      if (search) {
        searchModel = await ChallengeModel.findAll({
          attributes: [
            ['id', 'challenge_id'],
            'name',
            'content',
            'started_at',
            'requirement',
            'created_at',
          ],
          raw: true,
          order: [['created_at', 'DESC']],
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                content: {
                  [Op.like]: `%${search}%`,
                },
              },
            ],
          },
        });
      }
      const joinCountArray = await UserChallengeModel.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('user_id')), 'join_count'],
          'challenge_id',
        ],
        group: ['challenge_id'],
        order: [['challenge_id', 'DESC']], //최신순
        raw: true,
      });
      if (searchModel) {
        for (let i = 0; i < joinCountArray.length; i++) {
          for (let j = 0; j < searchModel.length; j++) {
            if (searchModel[j].id === joinCountArray[i].challenge_id) {
              searchModel[j].join_count = joinCountArray[i].join_count;
            } else {
              continue;
            }
          }
        }
      }

      const limitNum = req.query.limit || 10;
      const slicedJoinCount = joinCountArray.slice(0, limitNum);
      const latestResult = [];
      for (let i = 0; i < slicedJoinCount.length; i++) {
        await ChallengeModel.findOne({
          where: { id: slicedJoinCount[i].challenge_id },
          attributes: [
            ['id', 'challenge_id'],
            'name',
            'content',
            'started_at',
            'requirement',
            'created_at',
          ],
          raw: true,
        }).then((result) =>
          latestResult.push(
            Object.assign(result, {
              join_count: slicedJoinCount[i]['join_count'],
            })
          )
        );
      }
      res.status(200).send({
        message: 'OK',
        data: search ? searchModel : latestResult,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //[완료] 챌린지 생성하기
  new: (req, res) => {
    try {
      if (isAuthorized(req)) {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        ChallengeModel.create({
          name: req.body.name,
          content: req.body.content,
          started_at: req.body.started_at,
          requirement: req.body.requirement,
          author: userId,
        })
          .then((newChallenge) => {
            UserChallengeModel.create({
              user_id: userId,
              challenge_id: newChallenge.id,
            });
            return newChallenge;
          })
          .then((newChallenge) => {
            res.status(200).json({
              message: 'OK',
              data: {
                challenge_id: newChallenge.id,
                name: newChallenge.name,
                author: userId,
              },
            });
          });
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //[완료] 챌린지 목록 불러오기 GET /:challenge_id
  list: async (req, res) => {
    try {
      const newChallenge = await ChallengeModel.findOne({
        attributes: [
          ['id', 'challenge_id'],
          'name',
          'content',
          'started_at',
          'requirement',
          'author',
          'created_at',
        ],
        where: {
          id: req.params.challenge_id,
        },
      });
      if (!newChallenge) {
        res.status(404).json({ message: 'Not found' });
      } else {
        const joinCountArray = await UserChallengeModel.findAll({
          attributes: ['user_id'],
          where: { challenge_id: req.params.challenge_id },
        });
        const join_count = joinCountArray.length;
        var total_checkin_count = 0;
        const today = moment().format().slice(0, 10);
        const checkinTimes = await CheckInModel.findAll({
          attributes: ['created_at'],
          where: { challenge_id: req.params.challenge_id, created_at: today },
          raw: true,
        });
        total_checkin_count = checkinTimes.length;
        const checkin_log = [];
        for (let element of checkinTimes) {
          checkin_log.push(element.created_at);
        }
        const findRequirement = await ChallengeModel.findOne({
          attributes: ['requirement'],
          where: { id: req.params.challenge_id },
          raw: true,
        });
        var is_success = false;
        if (
          findRequirement &&
          Number(findRequirement.requirement) <= checkin_log.length
        ) {
          is_success = true;
        }
        const allComments = await CommentModel.findAll({
          attributes: [
            ['id', 'comment_id'],
            'user_id',
            'username',
            'challenge_id',
            'content',
            'created_at',
          ],
          where: { challenge_id: req.params.challenge_id },
          order: [[sequelize.col('created_at'), 'DESC']],
          raw: true,
        });
        var is_joined = false;

        if (isAuthorized(req)) {
          const authorization = isAuthorized(req);
          const userInfo = JSON.parse(authorization.data);
          const userId = userInfo.id;
          const findIsJoined = await UserChallengeModel.findOne({
            attributes: ['id'],
            where: { user_id: userId, challenge_id: req.params.challenge_id },
          });
          if (
            (newChallenge && findIsJoined) ||
            newChallenge.author === userId
          ) {
            is_joined = true;
          }
        }
        res.status(200).json({
          message: 'OK',
          data: {
            challenge_info: {
              ...newChallenge.dataValues,
              join_count: join_count,
              is_joined: is_joined,
            },
            checkin_info: {
              checkin_count: total_checkin_count,
              checkin_log: checkin_log,
              is_accomplished: is_success,
            },
            comments: allComments,
          },
        });
      }
    } catch (err) {
      console.log('ERROR in GET CHALLENGE', err);
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },

  //챌린지 수정하기 PATCH /:challenge_id
  edit: async (req, res) => {
    try {
      if (isAuthorized(req)) {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        const toBeUpdated = await ChallengeModel.findOne({
          attributes: ['name', 'content'],
          where: { id: req.params.challenge_id, author: userId },
          raw: true,
        });
        if (!toBeUpdated) {
          //작성자 아니면 수정 불가
          res.status(401).json({
            message: 'Invalid token',
          });
        } else {
          const modifiedChallenge = await ChallengeModel.update(
            {
              name: req.body.name,
              content: req.body.content,
              started_at: req.body.started_at,
              requirement: req.body.requirement,
            },
            { where: { id: req.params.challenge_id } }
          );
          const updatedResult = await ChallengeModel.findOne({
            attributes: [
              ['id', 'challenge_id'],
              'name',
              'content',
              'started_at',
              'requirement',
            ],
            where: { id: req.params.challenge_id },
            raw: true,
          });
          res.status(200).json({
            message: 'OK',
            data: updatedResult,
          });
        }
      } else {
        res.status(401).json({
          message: 'Invalid token',
        });
      }
    } catch (err) {
      console.log('ERROR', err);
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //챌린지 삭제하기 DELETE /:challenge_id
  delete: async (req, res) => {
    try {
      if (isAuthorized(req)) {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        const toBeUpdated = ChallengeModel.findOne({
          attributes: ['name', 'content'],
          where: { id: req.params.challenge_id, author: userId },
          raw: true,
        });
        if (!toBeUpdated) {
          //작성자 아니면 삭제 불가
          res.status(401).json({
            message: 'Invalid token',
          });
        } else {
          ChallengeModel.destroy({
            where: {
              id: req.params.challenge_id,
            },
          });
          res.status(200).json({ message: 'OK' });
        }
      } else {
        res.status(401).json({
          message: 'Invalid token',
        });
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //체크인(인증) 확인하기 GET /:challenge_id/checkins
  checkins: {
    get: async (req, res) => {
      try {
        // var join_count = 0;
        // var today_checkin_count = 0;
        // var is_success = false;
        // const today = new Date();
        // console.log('!!TODAY', today);
        // //토큰 확인 불필요
        // const joinCount = await UserChallengeModel.findOne({
        //   attributes: [
        //     [sequelize.fn('COUNT', sequelize.col('user_id')), 'join_count'],
        //     'challenge_id',
        //   ],
        //   group: ['challenge_id'],
        //   order: [[sequelize.col('join_count'), 'DESC']],
        //   raw: true,
        //   where: { challenge_id: req.params.challenge_id },
        // });
        // join_count = joinCount['join_count'];
        // const checkinTimes = await CheckInModel.findAll({
        //   attributes: ['created_at'],
        //   where: { challenge_id: req.params.challenge_id },
        //   raw: true,
        // });
        // console.log('!!THIS IS CHECK IN TIMES', checkinTimes);
        // today_checkin_count = checkinTimes.length;
        // const checkin_log = [];
        // for (let element of checkinTimes) {
        //   checkin_log.push(element.created_at);
        // }
        // const findRequirement = await ChallengeModel.findOne({
        //   attributes: ['requirement'],
        //   where: { id: req.params.challenge_id },
        //   raw: true,
        // });
        // if (Number(findRequirement.requirement) <= checkin_log.length) {
        //   is_success = true;
        // }
        // return res.status(200).json({
        //   message: 'OK',
        //   data: {
        //     join_count: join_count,
        //     checkin_count: today_checkin_count,
        //     checkin_log: checkin_log,
        //     is_accomplished: is_success,
        //   },
        // });
      } catch (err) {
        console.log('ERROR', err);
        res.status(500).send({
          message: 'Internal server error',
        });
      }
    },
    post: async (req, res) => {
      try {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        var checkin_log = [];
        var is_success = false;
        //토큰 확인 불필요
        const checkIfDone = await CheckInModel.findAll({
          attributes: ['created_at'],
          where: {
            challenge_id: req.params.challenge_id,
            user_id: userId,
          },
          raw: true,
        });
        if (
          checkIfDone.length > 0 &&
          new Date().toJSON().slice(0, 10) ===
            checkIfDone[checkIfDone.length - 1].created_at
        ) {
          res
            .status(409)
            .json({ message: 'Checkin already done within 24 hours' });
        } else {
          const checkinDone = await CheckInModel.create({
            user_id: userId,
            challenge_id: req.params.challenge_id,
          });
          const checkinLog = await CheckInModel.findAll({
            attributes: ['created_at'],
            where: {
              user_id: userId,
              challenge_id: req.params.challenge_id,
            },
            raw: true,
          });
          const findIfSuccess = await ChallengeModel.findOne({
            attributes: ['requirement'],
            where: {
              id: req.params.challenge_id,
            },
            raw: true,
          });
          for (let element of checkinLog) {
            checkin_log.push(element.created_at);
          }
          if (Number(findIfSuccess.requirement) <= checkin_log.length) {
            is_success = true;
            const randombadge = getRandomBadge(1, 20);
            const obtainBadge = await UserBadgeModel.create({
              user_id: userId,
              badge_id: randombadge,
              is_selected: false,
            });
            res.status(201).json({
              message: 'OK',
              data: {
                checkin_log: checkin_log,
                is_accomplished: is_success,
                obtained_badge: obtainBadge.badge_id,
              },
            });
          } else {
            res.status(201).json({
              message: 'OK',
              data: {
                checkin_log: checkin_log,
                is_accomplished: is_success,
                obtained_badge: null,
              },
            });
          }
        }
      } catch (err) {
        console.log('ERROR', err);
        res.status(500).send({
          message: 'Internal server error',
        });
      }
    },
  },
  comments: {
    //댓글 목록 불러오기 GET /:challenge_id/comments
    get: async (req, res) => {
      try {
        const commentList = await CommentModel.findAll({
          attributes: [
            ['id', 'comment_id'],
            'user_id',
            'challenge_id',
            'username',
            'content',
            'created_at',
          ],
          where: { challenge_id: req.params.challenge_id },
          order: [[sequelize.col('created_at'), 'DESC']],
          raw: true,
        });
        const result = [];
        for (let element of commentList) {
          result.push({
            comment_id: element.id,
            user_id: element.user_id,
            username: element.username,
            challenge_id: element.challenge_id,
            content: element.content,
            created_at: element.created_at,
          });
        }
        res.status(200).json({
          message: 'OK',
          data: {
            comments: commentList,
          },
        });
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
    },
    //댓글 수정하기 PATCH /:challenge_id/comments/:comment_id
    patch: async (req, res) => {
      try {
        if (!isAuthorized(req)) {
          res.status(401).json({ message: 'Invalid token' });
        } else {
          const authorization = isAuthorized(req);
          const userInfo = JSON.parse(authorization.data);
          const userId = userInfo.id;
          const findFirst = await CommentModel.findOne({
            attributes: ['user_id'],
            where: {
              challenge_id: req.params.challenge_id,
              id: req.params.comment_id,
            },
            raw: true,
          });
          if (findFirst.user_id === userId) {
            const changedComment = await CommentModel.update(
              {
                content: req.body.content,
              },
              { where: { id: req.params.comment_id } }
            );
            const changedResult = await CommentModel.findOne({
              attributes: ['content'],
              where: { id: req.params.comment_id },
              raw: true,
            });
            res.status(200).json({ message: 'OK', data: changedResult });
          } else {
            res.status(401).json({ message: 'Invalid token' });
          }
        }
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
    },
    //댓글 삭제하기 DELETE /:challenge_id/comments/:comment_id
    delete: async (req, res) => {
      try {
        if (!isAuthorized(req)) {
          res.status(401).json({ message: 'Invalid token' });
        } else {
          const authorization = isAuthorized(req);
          const userInfo = JSON.parse(authorization.data);
          const userId = userInfo.id;
          const findFirst = await CommentModel.findOne({
            attributes: ['user_id'],
            where: {
              challenge_id: req.params.challenge_id,
              id: req.params.comment_id,
            },
            raw: true,
          });
          console.log('USER ID', userId);
          console.log('findFirst.user_id', findFirst.user_id);
          if (findFirst.user_id === userId) {
            await CommentModel.destroy({
              where: { id: req.params.comment_id },
            });
            res.status(200).json({ message: 'OK' });
          } else {
            res.status(401).json({ message: 'Invalid token' });
          }
        }
      } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
    },
    //댓글 작성하기 POST /:challenge_id/comments
    post: async (req, res) => {
      try {
        if (!isAuthorized(req)) {
          res.status(401).json({ message: 'Invalid token' });
        } else {
          const authorization = isAuthorized(req);
          const userInfo = JSON.parse(authorization.data);
          console.log('THIS IS USERINFO'.userInfo);
          const userId = userInfo.id;
          const postComment = await CommentModel.create({
            user_id: userId,
            username: userInfo.username,
            challenge_id: req.params.challenge_id,
            content: req.body.content,
          });
          res
            .status(201)
            .json({ message: 'OK', data: { content: postComment.content } });
        }
      } catch (err) {
        console.log('ERROR in POST COMMENT', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  },
  join: async (req, res) => {
    try {
      if (!isAuthorized(req)) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        await UserChallengeModel.create({
          user_id: userId,
          challenge_id: req.params.challenge_id,
        });
        const findJoinedChallenge = await ChallengeModel.findOne({
          attributes: [
            ['id', 'challenge_id'],
            'name',
            'content',
            'started_at',
            'requirement',
          ],
          where: {
            id: req.params.challenge_id,
          },
          raw: true,
        });
        res.status(200).json({ message: 'OK', data: findJoinedChallenge });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
