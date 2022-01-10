const router = require('express').Router();
const { users } = require('../controllers');

//로그인;
router.post('/login', users.login);

//로그아웃
router.post('/logout', users.logout);

//회원가입
router.post('/signup', users.signup);

//회원탈퇴
router.post('/signout', users.signout);

//비밀번호 변경
router.patch('/:user_id/password', users.password);

//유저정보 변경
router.patch('/:user_id', users.userinfo.patch);

//유저정보 불러오기
router.get('/:user_id', users.userinfo.get);

module.exports = router;
