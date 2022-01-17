import { combineReducers } from 'redux';
import userReducer from './userReducer';
import titleReducer from './titleReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userReducer,
  titleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
