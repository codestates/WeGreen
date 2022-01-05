import { LOGIN, LOGOUT, UPDATE_USERINFO } from '../actions/index';
import { initialState } from './initialState';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isLogin: true,
        userInfo: { ...state.userInfo, ...action.payload },
      });
      break;
    case LOGOUT:
      return Object.assign({}, state, {
        isLogin: false,
        userInfo: { ...state.userInfo, ...action.payload },
      });
      break;
    case UPDATE_USERINFO:
      return Object.assign({}, state, {
        userInfo: { ...state.userInfo, ...action.payload },
      });
      break;
    default:
      return state;
  }
};

export default userReducer;
