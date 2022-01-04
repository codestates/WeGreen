const router = require("express").Router();
const userRouter = require("./users");
const challRouter = require("./challenges");
const badges = require("./badges");

router.use("/users", userRouter);
router.use("/challenges", challRouter);
router.use("/users-badges", badges);

module.exports = router;
