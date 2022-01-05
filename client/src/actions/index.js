// action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';

// actions creator functions
export const login = (userInfoObj) => {
  return {
    type: LOGIN,
    payload: {
      ...userInfoObj,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      userId: -1,
      userName: 'guest',
      isAdmin: false,
    },
  };
};

export const updateUserinfo = (userName, userBio) => {
  return {
    type: UPDATE_USERINFO,
    payload: {
      userName,
      userBio
    },
  };
};

