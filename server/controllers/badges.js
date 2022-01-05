const { getUserInfo } = require("./tokenFunctions");
const { users_badge: UserBadgeModel } = require("../models");

module.exports = {
  patch: async (req, res) => {
    const userInfo = getUserInfo(req);
    const userId = userInfo.id;
    const badgeArray = req.body.badge_ids;

    res.send();
  },
};
