import axios from 'axios';

// 로그인
export const requestLogin = (email, password) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        email,
        password,
      },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
};

// 회원가입
export const requestSignup = (email, username, password) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/signup`,
      {
        email,
        username,
        password,
      },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
};

// 로그아웃
export const requestLogout = () => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => console.log(result));
};

// 챌린지 리스트 - 인기순
export const requestPopularChallenges = (limit, query) => {
  console.log(limit, query);
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/challenges/popular?limit=${limit}${
        query ? '&query=' + query : ''
      }`,
      {},
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    )
    .then((result) => {
      console.log(result);
      return result.data.data;
    });
};

// 챌린지 리스트 - 최신순
export const requestLatestChallenges = (limit, query) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/challenges/latest?limit=${limit}${
        query ? '$query=' + query : ''
      }`,
      {},
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    )
    .then((result) => {
      console.log(result);
      return result.data.data;
    });
};

// 개인정보
export const requestMyinfo = (userId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
    .then((result) => result.data.data);
};

// 개인정보 수정
export const updateMyinfo = (userId, body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users/${userId}`, body, {
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then((result) => result.data.data);
};

export const updateMyBadges = (body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users-badges`, body, {
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then((result) => result.data.data);
};

export const modifyPassword = (userId, body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users/${userId}/password`, body, {
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then((result) => result.data);
};

// 회원탈퇴
export const signout = () => {
  console.log(`${process.env.REACT_APP_API_URL}/users/signout`);
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/signout`,
      {},
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => result.data);
};

export const requestChallenge = (challengeId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/challenges/${challengeId}`)
    .then((result) => result.data.data);
};

export const createChallenge = (body) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/challenges`, body, {
      'Content-Type': 'application/json',
      withCredentials: true,
    })
    .then((result) => result.data);
};

export const requestKakaoLogin = () => {
  window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  );
};

export const editChallenge = (body) => {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/challenges/${body.challenge_id}`,
      body,
      { 'Content-Type': 'application/json', withCredentials: true }
    )
    .then((result) => result.data);
};

// 댓글 생성
export const createComment = (id, content) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/challenges/${id}/comments`,
      { content },
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      }
    )
    .then((result) => {
      console.log(result.data);
    });
};

export const requestNaverLogin = () => {
  window.location.assign(
    `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state='wegreen'&response_type=code`
  );
};
