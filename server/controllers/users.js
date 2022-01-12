const {
  user: UserModel,
  users_badge: UserBadgeModel,
  challenge: ChallengeModel,
  users_challenge: UserChallengeModel,
  checkin: CheckInModel,
  sequelize,
} = require('../models');
const {
  hashedpassword,
  comparepassword,
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require('./tokenFunctions');
require('dotenv').config();

function getRandomBadge(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

module.exports = {
  //로그인
  login: async (req, res, next) => {
    try {
      const DBpassword = await UserModel.findOne({
        attributes: ['password'],
        where: {
          email: req.body.email,
        },
      });
      if (!DBpassword) {
        res.status(401).send({
          message: 'Invalid password or email',
        });
      } else {
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
            message: 'Invalid password or email',
          });
        }
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
      next(err);
    }
  },

  //토큰 구현 후 로그아웃
  logout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken'); //쿠키 클리어
      res.status(200).send({ message: 'OK' });
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
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
        const { id } = result;
        const randombadge = getRandomBadge(1, 20);
        const obtainBadge = await UserBadgeModel.create({
          user_id: id,
          badge_id: randombadge,
          is_selected: true,
        });
        const updateBadge = await UserModel.update(
          {
            badge_id: randombadge,
          },
          { where: { id: id } }
        );
        const finalUserInfo = await UserModel.findOne({
          attributes: ['id', 'badge_id', 'username', 'email', 'created_at'],
          where: { id: id },
          raw: true,
        });
        res.status(201).json({
          message: 'Created',
          data: {
            email: finalUserInfo.email,
            username: finalUserInfo.username,
          },
        }); //password 뺀 result 보내줘야함
      } else if (!created) {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    } catch (err) {
      console.log('ERROR', err);
      res.status(500).send({
        message: 'Internal server error',
      });
      next(err);
    }
  },
  // 토큰 확인 후 회원탈퇴
  signout: (req, res, next) => {
    try {
      if (isAuthorized(req)) {
        const userInfo = JSON.parse(isAuthorized(req).data);
        const userId = userInfo.id;
        UserModel.destroy({
          where: {
            id: userId,
          },
          cascade: true,
        }).then(() => {
          res.clearCookie('accessToken');
          res.status(200).json({ message: 'OK' });
        });
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
      next(err);
    }
  },

  //비밀번호 변경
  password: async (req, res, next) => {
    try {
      if (isAuthorized(req)) {
        const { currentPWD, newPWD } = req.body;
        const DBpassword = await UserModel.findOne({
          attributes: ['password'],
          where: {
            id: req.params.user_id,
          },
        });
        if (!comparepassword(currentPWD.toString(), DBpassword.password)) {
          res
            .status(401)
            .json({ message: 'Invalid password or token expired' });
        } else if (comparepassword(newPWD.toString(), DBpassword.password)) {
          res.status(409).json({ message: 'Same password' });
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
              message: 'OK',
            });
          } else {
            res.status(500).json({ message: 'Internal server error' });
          }
        }
      } else {
        res.status(401).json({ message: 'Invalid password or token expired' });
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
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
          message: 'OK',
          data: {
            user_id: req.params.user_id,
            username: user.username,
            bio: user.bio,
            badge_id: user.badge_id,
          },
        });
      } catch (err) {
        res.status(500).send({
          message: 'Internal server error',
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
        const badgeArray = await UserBadgeModel.findAll({
          attributes: ['badge_id', 'is_selected'],
          where: { user_id: req.params.user_id },
          raw: true,
        });
        const badges = [];
        const selected_badges = [];
        for (let badge of badgeArray) {
          badges.push(badge.badge_id);
          if (badge.is_selected === 1) {
            selected_badges.push(badge.badge_id);
          }
        }
        const checkinLog = await CheckInModel.findAll({
          attributes: [
            [
              sequelize.fn('COUNT', sequelize.col('created_at')),
              'checkin_count',
            ],
            'challenge_id',
          ],
          where: { user_id: req.params.user_id },
          group: ['challenge_id'],
          order: [['challenge_id', 'ASC']],
          raw: true,
        });
        const result = [];
        for (let challengeIdx of checkinLog) {
          const toCalculate = await ChallengeModel.findOne({
            attributes: ['started_at', 'requirement'],
            where: { id: challengeIdx.challenge_id },
            raw: true,
          });
          const sevenDaysLater = new Date(toCalculate.started_at);
          const finishedDate = new Date(
            sevenDaysLater.setDate(sevenDaysLater.getDate() + 8) //00시 기준이라 8일 더했음
          );
          const is_accomplished =
            challengeIdx.checkin_count >= Number(toCalculate.requirement);
          result.push(
            Object.assign(
              await ChallengeModel.findOne({
                attributes: ['id', 'name', 'started_at', 'requirement'],
                where: { id: challengeIdx.challenge_id },
                raw: true,
              }),
              {
                checkin_count: challengeIdx.checkin_count,
                is_finished: finishedDate < new Date(), //8일 더해서 같거나 작은게 아니라 작은걸로..
                is_accomplished: is_accomplished,
              }
            )
          );
        }
        res.status(200).json({
          message: 'OK',
          data: {
            user_info: {
              username: user.username,
              bio: user.bio,
              badge_id: user.badge_id,
              badges: badges,
              selected_badges: selected_badges,
            },
            challenge_info: {
              challenges: result,
            },
          },
        });
      } catch (err) {
        res.status(500).send({
          message: 'Internal server error',
        });
        next(err);
      }
    },
  },
};
