const router = require('express').Router();
const userRouter = require('./users');
const challRouter = require('./challenges');
const badges = require('./badges');
const kakaoController = require('../controllers/kakao');
const naverController = require('../controllers/naver');
const googleController = require("../controllers/google")

router.use('/users', userRouter);
router.use('/challenges', challRouter);
router.use('/users-badges', badges);
router.post('/oauth/kakao/login', kakaoController.login);
router.post('/oauth/naver/login', naverController.login);
router.post('/oauth/google/login',googleController.login);

module.exports = router;
