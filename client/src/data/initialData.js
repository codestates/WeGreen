export const loadingChallenge = {
  challenge_id: -1,
  name: '챌린지 불러오는 중',
  content: '챌린지를 불러오고 있습니다. 잠시만 기다려주세요.',
  started_at: '2022-01-01',
  requirement: 7,
  author: -99,
  created_at: '2021-01-01',
  join_count: 0,
  is_joined: false,
};

export const loadingComments = [
  {
    comment_id: -1,
    user_id: -1,
    username: '',
    challenge_id: -1,
    content: '댓글를 불러오고 있습니다. 잠시만 기다려주세요.',
    created_at: '',
  },
];

const now = new Date();
export const TODAY = new Date(
  `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
    -2
  )}-${now.getDate()}`
);