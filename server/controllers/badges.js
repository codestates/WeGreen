const { badge: BadgeModel } = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const cookieParser = require("cookie-parser");

module.exports = {
  patch: async (req, res) => {
    console.log("COOKIES DATA", req.cookies);

    res.send();
  },
};
