var express = require("express");
var router = express.Router();
const { Op } = require("sequelize"); //sequelize or 쓸때 필요합니다.
const { user: UserModel } = require("../models");
//근데 이거 github이라 네이버,카카오 하는거 보고 다시 해야합니다.
require("dotenv").config();

module.exports = {
  //로그인
  //! 토큰 data에 담기
  login: async (req, res, next) => {
    try {
      //SELECT USER WHERE email=== req.body.email AND password===req.body.password
      const user = await UserModel.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      //user가 존재하면
      if (user) {
        return res.status(200).json({
          message: "OK",
          data: {
            user_id: user.id,
            username: user.username,
            is_admin: user.is_admin,
          },
        });
      }
      //user의 정보랑 일치하는게 없으면 "message":"Invalid password or email"랑 401을 보낸다.
      else {
        return res.status(401).send({
          message: "Invalid password or email",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },

  //!토큰 구현 후 로그아웃
  logout: async (req, res, next) => {
    try {
      res.status(200).send({ message: "OK" });
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },
  //회원가입
  signup: async (req, res) => {
    const [result, created] = await UserModel.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        username: req.body.username,
        password: req.body.password, //!password는 해시값으로 바꿔야함.
      },
    });
    if (created) {
      res.status(201).json(result);
    } else if (!created) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //! 토큰 구현 후 회원탈퇴
  signout: async (req, res, next) => {
    try {
      const result = await UserModel.destory({
        where: {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        },
      });
      return res.status(204).json(result);
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },

  //! 다시 코드 짜야함 비밀번호 변경
  password: async (req, res, next) => {
    try {
      //이미 존재하는 password 가 있으면 401보내고 "Invalid password or token expired" 이라 합니다.
      //SELECT users WHERE password:req.body.password
      const alreadyPassword = await UserModel.findAll({
        where: {
          password: req.body.password,
        },
      });
      //이미 존재하는 password 가 있으면 401보내고 "Invalid password or token expired" 이라 합니다.
      if (alreadyPassword) {
        return res.status(401).json({
          message: "Invalid password or token expired",
        });
      }
      const users = await UserModel.update(
        {
          password: req.body.password,
        },
        {
          where: { id: req.params.user_id },
        }
      );
      return res.status(200).json({
        message: "OK",
      });
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },
  userinfo: {
    //유저정보 변경
    patch: async (req, res, next) => {
      try {
        //이미 존재하는 username 가 있으면 401보내고 "message": "Token expired" 이라 합니다.
        //SELECT alreadyUserInfo WHERE username:req.body.username
        const alreadyUserInfo = await UserModel.findAll({
          where: {
            username: req.body.username,
          },
        });
        //이미 존재하는 password 가 있으면 401보내고 "Invalid password or token expired" 이라 합니다.
        if (alreadyUserInfo) {
          return res.status(401).json({
            message: "Token expired",
          });
        }
        const users = await UserModel.update(
          {
            password: req.body.password,
            bio: req.body.bio,
            badge_id: req.body.badge_id,
          },
          {
            where: { id: req.params.user_id },
          }
        );
        return res.status(200).json({
          message: "OK",
          data: {
            user_id: req.body.user_id,
            username: req.body.username,
            bio: req.body.bio,
            badge_id: req.body.badge_id,
          },
        });
      } catch (err) {
        res.status(500).send({
          message: "Internal server error",
        });
        next(err);
      }
    },
    //유저정보 불러오기
    get: async (req, res, next) => {
      try {
        const users = await UserModel.findAll({
          where: { id: req.params.user_id },
        });
        return res.status(200).json({
          message: "OK",
          data: {
            username: users.username,
            bio: users.bio,
            badge_id: users.badge_id,
          },
        });
      } catch (err) {
        res.status(500).send({
          message: "Internal server error",
        });
        next(err);
      }
    },
  },
};
