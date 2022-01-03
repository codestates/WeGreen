const router = require("express").Router();
const { badges } = require("../controllers");

//유저가 선택한 뱃지들
router.patch("/", badges.patch);
