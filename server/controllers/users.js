const { user: UserModel } = require("../models");
const {
  hashedpassword,
  comparepassword,
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require("./tokenFunctions");
require("dotenv").config();

module.exports = {
  //로그인
  login: async (req, res, next) => {
    try {
      const DBpassword = await UserModel.findOne({
        attributes: ["password"],
        where: {
          email: req.body.email,
        },
      });
      const compareResult = comparepassword(
        req.body.password.toString(),
        DBpassword.password
      );
      const user = await UserModel.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user && compareResult) {
        const data = {
          user_id: user.id,
          username: user.username,
          is_admin: user.is_admin,
        };
        const { id, email, username, is_social, is_admin, bio, badge_id } =
          user;
        const accessToken = generateAccessToken(
          JSON.stringify({
            id,
            email,
            username,
            is_social,
            is_admin,
            bio,
            badge_id,
          })
        );
        sendAccessToken(res, data, accessToken);
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

  //토큰 구현 후 로그아웃
  logout: async (req, res, next) => {
    try {
      res.clearCookie("accessToken"); //쿠키 클리어
      res.status(200).send({ message: "OK" });
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },
  //회원가입
  signup: async (req, res, next) => {
    try {
      let password = req.body.password.toString();
      const encrypted = hashedpassword(password);
      const [result, created] = await UserModel.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          username: req.body.username,
          password: encrypted, //해시된 password로 저장.
        },
      });
      if (created) {
        const { badge_id, id, username, email, updatedAt, createdAt } = result;
        res
          .status(201)
          .json({ badge_id, id, username, email, updatedAt, createdAt }); //password 뺀 result 보내줘야함
      } else if (!created) {
        res.status(409).json({ message: "Email already exists" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },
  // 토큰 확인 후 회원탈퇴
  signout: async (req, res, next) => {
    try {
      if (isAuthorized) {
        const result = await UserModel.destroy({
          where: {
            email: req.body.email,
          },
        });
        res.clearCookie("accessToken");
        res.status(204).json(result);
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(err);
    }
  },

  //비밀번호 변경
  password: async (req, res, next) => {
    try {
      if (isAuthorized) {
        const { currentPWD, newPWD } = req.body;
        const DBpassword = await UserModel.findOne({
          attributes: ["password"],
          where: {
            id: req.params.user_id,
          },
        });
        if (currentPWD === DBpassword) {
          res.status(409).json({ message: "Same password" });
        } else {
          const encrypted = hashedpassword(newPWD);
          const changed = await UserModel.update(
            {
              password: encrypted, //암호화된 새로운 비밀번호로 DB 저장
            },
            {
              where: {
                id: req.params.user_id,
              },
            }
          );
          if (changed) {
            res.status(200).json({
              message: "OK",
            });
          } else {
            res.status(500).json({ message: "Internal server error" });
          }
        }
      } else {
        res.status(401).json({ message: "Invalid password or token expired" });
      }
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
        if (req.body.username) {
          await UserModel.update(
            {
              username: req.body.username, //새로운 username
            },
            {
              where: {
                id: req.params.user_id,
              },
            }
          );
        }
        if (req.body.bio) {
          await UserModel.update(
            {
              bio: req.body.bio, //새로운 자기소개
            },
            {
              where: {
                id: req.params.user_id,
              },
            }
          );
        }
        if (req.body.badge_id) {
          await UserModel.update(
            {
              badge_id: req.body.badge_id, //새로운 메인 뱃지
            },
            {
              where: {
                id: req.params.user_id,
              },
            }
          );
        }
        const user = await UserModel.findOne({
          where: { id: req.params.user_id },
        });
        res.status(200).json({
          message: "OK",
          data: {
            user_id: req.params.user_id,
            username: user.username,
            bio: user.bio,
            badge_id: user.badge_id,
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
        const user = await UserModel.findOne({
          where: { id: req.params.user_id },
        });
        res.status(200).json({
          message: "OK",
          data: {
            user_info: {
              username: user.username,
              bio: user.bio,
              badge_id: user.badge_id,
              badges: [],
              selected_badges: [],
            },
            challenge_info: {
              challenges: [{}],
            },
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
