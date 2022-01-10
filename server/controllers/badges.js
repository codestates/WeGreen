const { isAuthorized } = require('./tokenFunctions');
const { users_badge: UserBadgeModel } = require('../models');

module.exports = {
  patch: async (req, res) => {
    try {
      if (isAuthorized(req)) {
        const userInfo = JSON.parse(isAuthorized(req).data);
        const userId = userInfo.id;
        const badgeArray = req.body.badge_ids;
        const allFalse = await UserBadgeModel.update(
          {
            is_selected: false,
          },
          {
            where: {
              user_id: userId,
            },
          }
        );
        for (let badgeId of badgeArray) {
          await UserBadgeModel.update(
            { is_selected: true },
            { where: { user_id: userId, badge_id: badgeId } }
          );
        }
        const selected = await UserBadgeModel.findAll({
          attributes: ['badge_id'],
          where: {
            is_selected: true,
            user_id: userId,
          },
          raw: true,
        });
        const resultArray = [];
        for (let badge of selected) {
          resultArray.push(badge.badge_id);
        }
        res
          .status(200)
          .json({ message: 'OK', data: { selected_badges: resultArray } });
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      console.log('ERROR', err);
      res.status(500).send({
        message: 'Internal server error',
      });
    }
    res.send();
  },
};
