const {
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  comment: CommentModel,
  checkin: CheckInModel,
  users_badge: UserBadgeModel,
  user: UserModel,
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
      const search = req.query.query || '';
      const limitNum = Number(req.query.limit) || 20;
      const searchModel = await ChallengeModel.findAll({
        attributes: [
          ['id', 'challenge_id'],
          'name',
          'content',
          'started_at',
          'requirement',
          'created_at',
        ],
        raw: true,
        limit: limitNum,
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

      const popularResult = [];

      const joinCountArray = await UserChallengeModel.findAll({
        attributes: [

          [sequelize.fn('COUNT', sequelize.col('id')), 'join_count'],

          'challenge_id',
        ],
        group: ['challenge_id'],
        limit: limitNum,
        order: [[sequelize.col('join_count'), 'DESC']],
        raw: true,
      });
      console.log('!!THIS IS JOIN COUNT ARRAY!!', joinCountArray)
      for (let idx of joinCountArray) {
        const searchModelIdx = searchModel.find(
          (ele) => ele.challenge_id === idx.challenge_id
        );
        if (searchModelIdx) {
          popularResult.push(
            Object.assign(searchModelIdx, {
              join_count: idx.join_count,
            })
          );
        }
      }
      console.log('!!THIS IS POPULAR RESULT!!!', popularResult)
      res.status(200).json({ message: 'OK', data: popularResult });
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  //최신 챌린지 목록 불러오기 GET /latest
  latest: async (req, res) => {
    try {
      const search = req.query.query || '';
      //클라이언트에서 보낸 req.query를 찍어보면 req.query : {limit: '10$query=물'}
      const limitNum = Number(req.query.limit) || 20;
      const searchModel = await ChallengeModel.findAll({
        attributes: [
          ['id', 'challenge_id'],
          'name',
          'content',
          'started_at',
          'requirement',
          'created_at',
        ],
        raw: true,
        order: [['created_at', 'DESC']], //최신순
        limit: limitNum,
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
      const latestResult = [];
      for (let challenge of searchModel) {
        var join_count = await UserChallengeModel.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'join_count'],
            'challenge_id',
          ],
          where: { challenge_id: challenge.challenge_id },
          group: ['challenge_id'],
          raw: true,
        });
        if (join_count.length === 0) join_count = [{ join_count: 0 }];
        latestResult.push(
          Object.assign(challenge, {
            join_count: join_count[0].join_count,
          })
        );
      }
      res.status(200).send({
        message: 'OK',
        data: latestResult,
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
        const joinCountArray = await UserChallengeModel.findOne({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'join_count'],
            'challenge_id',
          ],
          group: ['challenge_id'],
          where: { challenge_id: req.params.challenge_id },
          raw: true,
        });
        const join_count = joinCountArray.join_count;
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
        const is_admin = userInfo.is_admin;
        const toBeUpdated = await ChallengeModel.findOne({
          attributes: ['name', 'content'],
          where: { id: req.params.challenge_id, author: userId },
          raw: true,
        });
        if (!toBeUpdated && !is_admin) {
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
        if (!toBeUpdated && !is_admin) {
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
      } catch (err) {}
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
          var randombadge;
          if (Number(findIfSuccess.requirement) <= checkin_log.length) {
            is_success = true;
            const alreadyHave = await UserBadgeModel.findAll({
              where: { user_id: userId },
              attributes: ['badge_id'],
              raw: true,
            });
            const fullBadge = [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ];
            for (let idx of alreadyHave) {
              if (fullBadge.includes(idx.badge_id)) {
                fullBadge.splice(fullBadge.indexOf(idx.badge_id), 1);
              }
            }
            var count = fullBadge.length;
            if (count > 1) {
              const randomIdx = getRandomBadge(0, count - 1);
              randombadge = fullBadge[randomIdx];
            } else if (count === 1) {
              randombadge = fullBadge[0];
            } else {
              randombadge = -1;
            }
            if (randombadge > 0) {
              const obtainBadge = await UserBadgeModel.create({
                user_id: userId,
                badge_id: randombadge,
                is_selected: true, //획득시 바로 보이게
              });
            }
            res.status(201).json({
              message: 'OK',
              data: {
                checkin_log: checkin_log,
                is_accomplished: is_success,
                obtained_badge: randombadge,
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
          const is_admin = userInfo.is_admin;
          const findFirst = await CommentModel.findOne({
            attributes: ['user_id'],
            where: {
              challenge_id: req.params.challenge_id,
              id: req.params.comment_id,
            },
            raw: true,
          });
          if (findFirst.user_id === userId || is_admin) {
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
          const is_admin = userInfo.is_admin;
          const findFirst = await CommentModel.findOne({
            attributes: ['user_id'],
            where: {
              challenge_id: req.params.challenge_id,
              id: req.params.comment_id,
            },
            raw: true,
          });

          if (findFirst.user_id === userId || is_admin) {
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
          const userId = userInfo.id;
          const latestUserInfo = await UserModel.findOne({
            where: { id: userId },
            raw: true,
            attributes: ['username'],
          });
          const postComment = await CommentModel.create({
            user_id: userId,
            username: latestUserInfo.username,
            challenge_id: req.params.challenge_id,
            content: req.body.content,
          });
          res
            .status(201)
            .json({ message: 'OK', data: { content: postComment.content } });
        }
      } catch (err) {
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
