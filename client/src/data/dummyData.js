export const dummyChallenges = [
  {
    challenge_id: 3,
    name: '텀블러 쓰기',
    content: '텀블러를 씁시다',
    started_at: '2022-01-03',
    requirement: '주7회',
    created_at: '2021-12-30',
    join_count: 45,
  },
  {
    challenge_id: 4,
    name: '분리수거하기',
    content: '분리수거를 열심히 해 봅시다',
    started_at: '2022-01-03',
    requirement: '주1회',
    created_at: '2021-12-30',
    join_count: 12,
  },
  {
    challenge_id: 5,
    name: '비닐봉투 안 쓰기',
    content: '비닐봉투 대신 장바구니 사용',
    started_at: '2022-01-03',
    requirement: '주7회',
    created_at: '2021-12-30',
    join_count: 30,
  },
];

export const dummyChallenge = {
  challenge_id: 3,
  name: '텀블러 사용하기',
  content: '일회용컵대신 텀블러를 사용합시다. 외출시 텀블러를 챙겨주세요.',
  started_at: '2022-01-10',
  requirement: 5,
  author: 1,
  created_at: '2021-01-08',
  join_count: 15,
  is_joined: false,
};

export const dummyComments = [
  {
    comment_id: 1,
    user_id: 3,
    username: '지구지킴이',
    challenge_id: 3,
    content:
      '에구... 오늘 텀블러 들고 나가는 거 깜빡해서 점심에 커피 일회용컵에 받았네요ㅠㅠ 내일은 알람이라도 맞춰야 겠어요.',
    created_at: '2021-12-28',
  },
  {
    comment_id: 2,
    user_id: 4,
    username: 'SlowButSteady',
    challenge_id: 3,
    content:
      '텀블러 매번 세척하는게 귀찮긴한데 그래도 플라스틱 하나 줄인다 생각하고 열심히 해봅니다ㅎㅎ',
    created_at: '2021-12-28',
  },
  {
    comment_id: 3,
    user_id: 5,
    username: '동해물과백두산이',
    challenge_id: 3,
    content:
      '지인한테서 텀블러를 선물받아서 챌린지 도전했어요. 아직 텀블러 들고다는게 습관이 안돼서 자꾸 까먹네요ㅠㅠ',
    created_at: '2021-12-28',
  },
];
