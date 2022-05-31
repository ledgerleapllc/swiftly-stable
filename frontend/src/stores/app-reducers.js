import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';

const appReducer = combineReducers({
  authReducer,
});

export default appReducer;
