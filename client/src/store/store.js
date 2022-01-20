import { compose, createStore, applyMiddleware } from 'redux';
import persistedReducer from '../reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
