// action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

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

export const updateUsername = (userName) => {
  return {
    type: UPDATE_USERNAME,
    payload: {
      userName,
    },
  };
};
