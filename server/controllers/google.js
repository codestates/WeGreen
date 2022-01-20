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

module.exports = {
  //로그인 및 회원가입
  login: async (req, res, next) => {
    try {
      // const authorizationCode = req.body.authorizationCode;
      const GOOGLE_REST_API_KEY = process.env.GOOGLE_REST_API_KEY;
      const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
      const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
      const code = req.body.authorizationCode;

      if (code) {
        const response = await axios({
          method: 'POST',
          url: `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_REST_API_KEY}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });

        const { access_token } = response.data;

        const googleUserInfo = await axios({
          method: 'GET',
          url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.data.access_token}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        });

        const { email } = googleUserInfo.data;
        const [newUserInfo, created] = await UserModel.findOrCreate({
          where: {
            email: email,
          },
          defaults: {
            username: email.split('@')[0],
            is_social: true,
            is_admin: false,
          },
        });
        const userId = await UserModel.findOne({
          where: { email: email },
          attributes: ['id'],
          raw: true,
        });
        delete newUserInfo.dataValues.password;

        if (created) {
          const randombadge = getRandomBadge(1, 20);
          const obtainBadge = await UserBadgeModel.create({
            user_id: userId.id,
            badge_id: randombadge,
            is_selected: true,
          });
          const updateBadge = await UserModel.update(
            {
              badge_id: randombadge,
            },
            { where: { email: email } }
          );
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
        const { id, username, is_social, is_admin, bio, badge_id } =
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
      console.log('ERROR', err);
      res.status(500).send({
        message: 'Internal server error',
      });
      next(err);
    }
  },
};
