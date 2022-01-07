const router = require("express").Router();
const { challenges } = require("../controllers");

//인기 챌린지 목록 불러오기
router.get("/popular", challenges.popular);

//최신 챌린지 목록 불러오기
router.get("/latest", challenges.latest);

//새챌린지 작성하기
router.post("/", challenges.new);

//챌린지 목록 불러오기
router.get("/:challenge_id", challenges.list);

//챌린지 수정하기
router.patch("/:challenge_id", challenges.edit);

//챌린지 삭제하기
router.delete("/:challenge_id", challenges.delete);

//체크인(인증) 확인하기
router.post("/:challenge_id/checkins", challenges.checkins); //! 포스트로 변경??

//댓글 목록 불러오기
router.get("/:challenge_id/comments", challenges.comments.get);

//댓글 수정하기
router.patch("/:challenge_id/comments/:comment_id", challenges.comments.patch);

//댓글 삭제하기
router.delete(
  "/:challenge_id/comments/:comment_id",
  challenges.comments.delete
);

//댓글 작성하기
router.post("/:challenge_id/comments", challenges.comments.post);

//챌린지 참가하기
router.post("/:challenge_id", challenges.join);

module.exports = router;
