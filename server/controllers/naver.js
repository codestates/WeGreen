require('dotenv').config();
const axios = require('axios');
axios.defaults.withCredentials = true;
const { user: UserModel, users_badge: UserBadgeModel } = require('../models');
const { generateAccessToken, sendAccessToken } = require('./tokenFunctions');

function getRandomBadge(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
function getRandomId() {
  return Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
}

module.exports = {
  //로그인 및 회원가입
  login: async (req, res, next) => {
    try {
      const authorizationCode = req.body.authorizationCode;

      const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
      const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

      const grantType = 'authorization_code';
      if (authorizationCode) {
        const response = await axios({
          method: 'POST',
          url: `https://nid.naver.com/oauth2.0/token?code=${authorizationCode}&state='wegreen'&grant_type=${grantType}&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}`,
        });

        const { access_token } = response.data;

        const naverUserInfo = await axios({
          method: 'GET',
          url: 'https://openapi.naver.com/v1/nid/me',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'text/json;charset=utf-8',
          },
        });
        const { email, nickname } = naverUserInfo.data.response;
        const id = getRandomId(); //네이버는 네이버 자체 id에 문자열도 섞여있어 10,000이상의 랜덤 숫자

        const findUser = await UserModel.findOne({
          attributes: ['id', 'email'],
          where: { email: email },
          raw: true,
        });

        if (!findUser) {
          const randombadge = getRandomBadge(1, 20);
          UserModel.create({
            email: email,
            username: nickname,
            is_social: true,
            is_admin: false,
            badge_id: randombadge,
          }).then((result) => {
            UserBadgeModel.create({
              user_id: id,
              badge_id: randombadge,
              is_selected: true,
            });
          });
        }

        const userInfoInToken = await UserModel.findOne({
          attributes: [
            'id',
            'email',
            'username',
            'is_social',
            'is_admin',
            'bio',
            'badge_id',
          ],
          where: {
            email: email,
          },
        });
        const { username, is_social, is_admin, bio, badge_id } =
          userInfoInToken;
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
        sendAccessToken(
          res,
          { user_id: id, username: username, is_admin: is_admin },
          accessToken
        );
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
      next(err);
    }
  },
};
