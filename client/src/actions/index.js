// action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const CHANGE_TITLE = 'CHANGE_TITLE';

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
      user_id: -1,
      username: 'guest',
      bio: 'guest user',
      badge_id: -1,
      badges: [],
      is_admin: false,
    },
  };
};

export const updateUserinfo = (userInfo) => {
  return {
    type: UPDATE_USERINFO,
    payload: {
      ...userInfo,
    },
  };
};

export const changeTitle = (title) => {
  return {
    type: CHANGE_TITLE,
    payload: {
      title: title,
    },
  };
};
