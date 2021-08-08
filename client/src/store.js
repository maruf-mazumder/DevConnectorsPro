import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootreducer from './reducers/index';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
console.log("-->", store);

export default store;