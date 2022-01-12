const router = require('express').Router();
const userRouter = require('./users');
const challRouter = require('./challenges');
const badges = require('./badges');
const kakaoController = require('../controllers/kakao');

router.use('/users', userRouter);
router.use('/challenges', challRouter);
router.use('/users-badges', badges);
router.post('/oauth/kakao/login', kakaoController.login);

module.exports = router;
