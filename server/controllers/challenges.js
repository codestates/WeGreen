const {
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  comment: CommentModel,
  checkin: CheckInModel,
  sequelize,
} = require('../models');
var express = require('express');
var router = express.Router();
const { Op } = require('sequelize'); //sequelize or 쓸때 필요합니다.
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  //인기 챌린지 목록 불러오기 GET /challenges/popular/?query=검색어&limit=3
  popular: async (req, res) => {
    try {
      var searchModel = ChallengeModel;
      if (req.query.query) {
        //!query search 아직 미완성
        const search = req.query.query;
        var searchModel = await ChallengeModel.findAll({
          attributes: ['name', 'content', 'id'],
          raw: true,
        });
      }
      const joinCountArray = await UserChallengeModel.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('user_id')), 'JOIN COUNT'],
          'challenge_id',
        ],
        group: ['challenge_id'],
        order: [[sequelize.col('JOIN COUNT'), 'DESC']],
        raw: true,
      });
      const limitNum = req.query.limit || 10;
      const slicedJoinCount = joinCountArray.slice(0, limitNum);
      const popularResult = [];
      for (let i = 0; i < slicedJoinCount.length; i++) {
        await ChallengeModel.findOne({
          where: { id: slicedJoinCount[i].challenge_id },
          raw: true,
        }).then((result) =>
          popularResult.push(
            Object.assign(result, {
              join_count: slicedJoinCount[i]['JOIN COUNT'],
            })
          )
        );
      }
      res.status(200).json({ message: 'OK', data: popularResult });
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
      var searchModel = ChallengeModel;
      if (req.query.query) {
        //!query search 아직 미완성
        const search = req.query.query;
        var searchModel = await ChallengeModel.findAll({
          attributes: ['name', 'content', 'id'],
          raw: true,
        });
      }
      const joinCountArray = await UserChallengeModel.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('user_id')), 'JOIN COUNT'],
          'challenge_id',
        ],
        group: ['challenge_id'],
        order: [['challenge_id', 'ASC']],
        raw: true,
      });
      const limitNum = req.query.limit || 10;
      const slicedJoinCount = joinCountArray.slice(0, limitNum);
      const latestResult = [];
      for (let i = 0; i < slicedJoinCount.length; i++) {
        await ChallengeModel.findOne({
          where: { id: slicedJoinCount[i].challenge_id },
          raw: true,
        }).then((result) =>
          latestResult.push(
            Object.assign(result, {
              join_count: slicedJoinCount[i]['JOIN COUNT'],
            })
          )
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
        ChallengeModel.create({
          name: req.body.name,
          content: req.body.content,
          started_at: req.body.started_at,
          requirement: req.body.requirement,
        })
          .then((NewChallenge) => {
            const authorization = isAuthorized(req);
            const userInfo = JSON.parse(authorization.data);
            const userId = userInfo.id;
            UserChallengeModel.create({
              user_id: userId,
              challenge_id: NewChallenge.id,
            });
            return NewChallenge;
          })
          .then((NewChallenge) => {
            res.status(200).json({
              message: 'OK',
              data: {
                id: NewChallenge.id,
                name: NewChallenge.name,
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
      var is_joined = false;
      const joinCountArray = await UserChallengeModel.findAll({
        attributes: ['user_id'],
        where: { challenge_id: req.params.challenge_id },
      });
      const join_count = joinCountArray.length;
      const NewChallenge = await ChallengeModel.findOne({
        attributes: [
          'id',
          'name',
          'content',
          'started_at',
          'requirement',
          'createdAt',
        ],
        where: {
          id: req.params.challenge_id,
        },
      });
      if (isAuthorized(req)) {
        const authorization = isAuthorized(req);
        const userInfo = JSON.parse(authorization.data);
        const userId = userInfo.id;
        const findIsJoined = await UserChallengeModel.findOne({
          attributes: ['id'],
          where: { user_id: userId, challenge_id: req.params.challenge_id },
        });
        if (findIsJoined) {
          is_joined = true;
        }
      }
      if (NewChallenge) {
        res.status(200).json({
          message: 'OK',
          data: {
            ...NewChallenge.dataValues,
            join_count: join_count,
            is_joined: is_joined,
          },
        });
      } else {
        res.status(404).json({ message: 'Not found' });
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
        const ChallengeUpdate = await ChallengeModel.update(
          {
            name: req.body.name,
            content: req.body.content,
            started_at: req.body.started_at,
            requirement: req.body.requirement,
          },
          { where: { id: req.params.challenge_id } }
        );
        const UpdateResult = await ChallengeModel.findOne({
          where: { id: req.params.challenge_id },
          raw: true,
        });
        res.status(200).json({
          message: 'OK',
          data: {
            id: UpdateResult.id,
            name: UpdateResult.name,
            content: UpdateResult.content,
            started_at: UpdateResult.started_at,
            requirement: UpdateResult.requirement,
          },
        });
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
  //챌린지 삭제하기 DELETE /:challenge_id 보류
  delete: (req, res) => {
    try {
      if (isAuthorized(req)) {
        ChallengeModel.destroy({
          where: {
            id: req.params.challenge_id,
          },
        }).then(() => {
          return res.status(204); //응답 바디 없음
        });
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
  checkins: async (req, res) => {
    try {
      const authorization = isAuthorized(req);
      const userInfo = JSON.parse(authorization.data);
      const userId = userInfo.id;
      var join_count = 0;
      var total_checkin_count = 0;
      // if (isAuthorized(req)) { //!토큰 확인 필요??
      UserChallengeModel.findOne({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('user_id')), 'JOIN COUNT'],
          'challenge_id',
        ],
        group: ['challenge_id'],
        order: [[sequelize.col('JOIN COUNT'), 'DESC']],
        raw: true,
        where: { challenge_id: req.params.challenge_id },
      })
        .then((result) => {
          join_count = result['JOIN COUNT'];
          return CheckInModel.create({
            user_id: userId,
            content: req.body.content,
            challenge_id: req.params.challenge_id,
          });
        })
        .then((result) => {
          return CheckInModel.findAll({
            attributes: ['createdAt'],
            where: { challenge_id: req.params.challenge_id },
            raw: true,
          });
        })
        .then((result) => {
          total_checkin_count = result.length;
          return CheckInModel.findAll({
            attributes: ['createdAt'],
            where: { user_id: userId, challenge_id: req.params.challenge_id },
            raw: true,
          });
        })
        .then((result) => {
          const checkin_log = [];
          for (let element of result) {
            checkin_log.push(element.createdAt);
          }
          return res.status(200).json({
            message: 'OK',
            data: {
              join_count: join_count,
              checkin_count: total_checkin_count,
              checkin_log: checkin_log,
            },
          });
        });
      // }else { //토큰확인한다면 다시 살려야함.
      //   res.status(401).json({
      //     message: "Invalid token",
      //   });
      // }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
  },
  comments: {
    //댓글 목록 불러오기 GET /:challenge_id/comments
    get: async (req, res) => {
      try {
        const commentList = await CommentModel.findAll({
          attributes: ['id', 'user_id', 'challenge_id', 'content', 'createdAt'],
          where: { challenge_id: req.params.challenge_id },
          raw: true,
        });
        const result = [];
        for (let element of commentList) {
          result.push({
            comment_id: element.id,
            user_id: element.user_id,
            challenge_id: element.challenge_id,
            content: element.content,
            created_at: element.createdAt,
          });
        }
        res.status(200).json({
          message: 'OK',
          data: {
            comments: result,
          },
        });
      } catch {
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
            });
            res.status(200).json({ message: 'OK', data: changedResult });
          } else {
            res.status(401).json({ message: 'Invalid token' });
          }
        }
      } catch {
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
            res.sendStatus(204);
          } else {
            res.status(401).json({ message: 'Invalid token' });
          }
        }
      } catch {
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
          const postComment = await CommentModel.create({
            user_id: userId,
            challenge_id: req.params.challenge_id,
            content: req.body.content,
          });
          res
            .status(201)
            .json({ message: 'OK', data: { content: postComment.content } });
        }
      } catch {
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
          attributes: ['id', 'name', 'content', 'started_at', 'requirement'],
          where: {
            id: req.params.challenge_id,
          },
          raw: true,
        });
        res.status(200).json({ message: 'OK', data: findJoinedChallenge });
      }
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
