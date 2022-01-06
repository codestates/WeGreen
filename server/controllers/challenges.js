const { challenge: ChallengeModel } = require("../models");
var express = require("express");
var router = express.Router();
const { Op } = require("sequelize"); //sequelize or 쓸때 필요합니다.

module.exports = {
  //인기 챌린지 목록 불러오기 GET /challenges/popular/?query=검색어&limit=3
  popular: async (req, res) => {
    try {
      const ChallengeList = await ChallengeModel.findAll({attributes:['id','name','content','started_at','requirement','createdAt','join_count'] , order:[['join_count','DESC']],limit:10},)
      res.status(200).send({
        message: "OK",
        result: ChallengeList
      })
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  //최신 챌린지 목록 불러오기 GET /latest
  latest: async (req, res) => {
    try {
      const ChallengeList = await ChallengeModel.findAll({order:[['id','DESC']],limit:10},)
      res.status(200).send({
        message: "OK",
        result: ChallengeList
      })
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  //새챌린지 작성하기 POST /
  new: async (req, res) => {
    try {
      const NewChallenge = await ChallengeModel.create({
        name: req.body.name,
        content : req.body.content,
        requirement : req.body.requirement,
        join_count: 0
      })

      if(NewChallenge){
        return res.status(200).json({
          message : "OK",
          data : {
            id : NewChallenge.id,
            name : NewChallenge.name
          }
        })
      }
      else{
        res.status(401).json({
          "message" :"Invalid token"
        })
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  //챌린지 목록 불러오기 GET /:challenge_id
  list: async (req, res) => {
    try {
      const NewChallenge = await ChallengeModel.findOne({ 
               attributes:['id','name','content','started_at','requirement','createdAt','join_count'],
               where : {
                 id: req.params.challenge_id
               }
      })
      if(NewChallenge){
        return res.status(200).json({
          message : "OK",
          data : {
               ...NewChallenge.dataValues,
               is_joined:true
          }
        })
      }
      else{
        res.status(404).json({
          "message" :"Not found"
        })
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },

//챌린지 수정하기 PATCH /:challenge_id
  edit: async (req, res) => {
    try {
      const ChallengeUpdate = await ChallengeModel.update({
                name:req.body.name,
                content:req.body.content, 
                started_at: req.body.started_at, 
                requirement: req.body.requirement
      },{where : {id : req.params.challenge_id}})
      const ChallengeBring = await ChallengeModel.findOne({
        where:{id: req.params.challenge_id}
      })
      if(ChallengeBring){
        return res.status(200).json({
          message : "OK",
          data : {
            id : ChallengeBring.id,
            name : ChallengeBring.name,
            started_at: ChallengeBring.started_at,
            requirement: ChallengeBring.requirement
          }
        })
      }
      else{
        res.status(401).json({
          "message" :"Invalid token"
        })
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  //챌린지 삭제하기 DELETE /:challenge_id 보류
  delete: async (req, res) => {
    try {
      const NewChallenge = await ChallengeModel.findOne({
               where : {
                 id : req.params.challenge_id
               }
      })

      if(NewChallenge){
       const Delete = ChallengeModel.destroy({
          where : {
            id : req.params.challenge_id
          }
        })
        return res.status(204).json({
          message : "OK",
        })
      }
      else{
        res.status(401).json({
          "message" :"Invalid token"
        })
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  //체크인(인증) 확인하기 GET /:challenge_id/checkins
  checkins: async (req, res) => {
    try {
      const NewChallenge = await ChallengeModel.findOne({
               where : {
                 id : req.params.challenge_id
               }
      })
      if(NewChallenge){
        return res.status(204).json({
          message : "OK", 
          data : {
            comments :[

            ]
          }
        })
      }
      else{
        res.status(401).json({
          "message" :"Invalid token"
        })
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  comments: {
    //댓글 목록 불러오기 GET /:challenge_id/comments
    get: async (req, res) => {
      res.send();
    },
    //댓글 수정하기 PATCH /:challenge_id/comments/:comment_id
    patch: async (req, res) => {
      res.send();
    },
    //댓글 삭제하기 DELETE /:challenge_id/comments/:comment_id
    delete: async (req, res) => {
      res.send();
    },
    //댓글 작성하기 POST /:challenge_id/comments
    post: async (req, res) => {
      res.send();
    },
  },
};