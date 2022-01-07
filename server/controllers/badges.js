const { isAuthorized } = require('./tokenFunctions');
const { users_badge: UserBadgeModel } = require('../models');

module.exports = {
  patch: async (req, res) => {
    try {
      if (isAuthorized(req)) {
        const userInfo = JSON.parse(isAuthorized(req).data);
        const userId = userInfo.id;
        const badgeArray = req.body.badge_ids;
        console.log('USER ID', userId);

        //   for (let badgeId in badgeArray) {
        //     UserBadgeModel.findOne({
        //       where: { user_id: userId, badge_id: badgeId },
        //     });
        //   }
        // })
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal server error',
      });
    }
    res.send();
  },
};
