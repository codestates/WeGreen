const { isAuthorized } = require("./tokenFunctions");
const { users_badge: UserBadgeModel } = require("../models");

module.exports = {
  patch: (req, res) => {
    try {
      if (req.headers["authorization"] && authorization.split(" ")[1]) {
        const userInfo = JSON.parse(isAuthorized(req).data);
        const userId = userInfo.id;
        const badgeArray = req.body.badge_ids;
        UserBadgeModel.update({
          where: { user_id: userId },
        })
          .then((result) => {
            return result.update({ is_selected: false });
          })
          .then(() => {
            badgeArray.forEach((badgeId) => {
              UserBadgeModel.findOne({
                where: { user_id: userId, badge_id: badgeId },
              });
            });
          })
          .then((result) => {
            result.update({ is_selected: true });
            console.log("####", result);
          });
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
    res.send();
  },
};
