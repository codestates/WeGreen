import axios from 'axios';

axios.defaults.withCredentials = true;

// 로그인
export const requestLogin = (email, password) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        email,
        password,
      },
      { 'Content-Type': 'application/json' }
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
      { 'Content-Type': 'application/json' }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
};

// 인증 이메일 전송 요청
export const requestSendingConfirmEmail = (email) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/email`,
      {
        email,
      },
      { 'Content-Type': 'application/json' }
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.response ? err.response : 'network error';
    });
};

// 인증코드 확인
export const requestCheckingConfirmCode = (email, code) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/code`,
      {
        email,
        confirmation_code: code,
      },
      { 'Content-Type': 'application/json' }
    )
    .then((result) => {
      console.log(result);
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
      { 'Content-Type': 'application/json' }
    )
    .then((result) => result.data);
};

// 챌린지 리스트 - 인기순
export const requestPopularChallenges = (limit, query) => {
  let string = `${process.env.REACT_APP_API_URL}/challenges/popular?`;
  string += `${limit > 0 ? 'limit=' + limit + '&' : ''}`;
  string += `${query ? '&query=' + query : ''}`;

  return axios
    .get(
      string,
      {},
      {
        'Content-Type': 'application/json',
      }
    )
    .then((result) => result.data.data);
};

// 챌린지 리스트 - 최신순
export const requestLatestChallenges = (limit, query) => {
  let string = `${process.env.REACT_APP_API_URL}/challenges/latest?`;
  string += `${limit > 0 ? 'limit=' + limit + '&' : ''}`;
  string += `${query ? '&query=' + query : ''}`;
  return axios
    .get(
      string,
      {},
      {
        'Content-Type': 'application/json',
      }
    )
    .then((result) => {
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
    })
    .then((result) => result.data.data);
};

// 뱃지 수정
export const updateMyBadges = (body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users-badges`, body, {
      'Content-Type': 'application/json',
    })
    .then((result) => result.data.data);
};

export const modifyPassword = (userId, body) => {
  return axios
    .patch(`${process.env.REACT_APP_API_URL}/users/${userId}/password`, body, {
      'Content-Type': 'application/json',
    })
    .then((result) => result.data);
};

// 회원탈퇴
export const signout = () => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/users/signout`,
      {},
      { 'Content-Type': 'application/json' }
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
    })
    .then((result) => result.data);
};
//카카오 로그인
export const requestKakaoLogin = () => {
  window.location.assign(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  );
};

//구글 로그인
export const requestGoogleLogin = () => {
  window.location.assign(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`
  );
};

// 챌린지 수정
export const editChallenge = (body) => {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/challenges/${body.challenge_id}`,
      body,
      { 'Content-Type': 'application/json' }
    )
    .then((result) => result.data);
};

// 챌린지 삭제
export const deleteChallenge = (challengeId) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/challenges/${challengeId}`,
      {},
      { 'Content-Type': 'application/json' }
    )
    .then((result) => result.data);
};

// 챌린지 참가
export const joinChallenge = (challengeId) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/join`,
      {},
      {
        'Content-Type': 'application/json',
      }
    )
    .then((result) => result.data);
};

// 챌린지 체크인
export const checkin = (challengeId) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/checkins`,
      {},
      {
        'Content-Type': 'application/json',
      }
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
      }
    )
    .then((result) => {
      return result;
    });
};

export const requestComments = (challengeId) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/challenges/${challengeId}/comments`)
    .then((result) => {
      return result;
    });
};

export const editComment = (challengeId, commentId, content) => {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/comments/${commentId}`,
      {
        content,
      },
      { 'Content-Type': 'application/json' }
    )
    .then((result) => result);
};

export const deleteComment = (challengeId, commentId) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/comments/${commentId}`,
      {},
      { 'Content-Type': 'application/json' }
    )
    .then((result) => result);
};

export const requestNaverLogin = () => {
  window.location.assign(
    `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state='wegreen'&response_type=code`
  );
};
