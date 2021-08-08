import { combineReducers } from 'redux';
import alert from './alert';
import authReducer from './auth';
import profile from './profile';
import post from './post';

// console.log("yyyy", alert);
export default combineReducers({
    alert,
    authReducer,
    profile ,
    post

})