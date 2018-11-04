import {combineReducers} from 'redux';
import LoginReducer from './login-reducer.js';
import PropertyReducer from './property-reducer.js';
import DashBoardReducer from './dashboard-reducer.js';
import PostPropertyReducer from './propertyPosting-reducer.js';
const storeManager = combineReducers({
  LoginReducer,
  PropertyReducer,
  DashBoardReducer,
  PostPropertyReducer
});

export default storeManager
