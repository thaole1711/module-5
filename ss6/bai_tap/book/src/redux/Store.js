import mainReducer from "./reducer/MainReducer.js";
import {thunk} from "redux-thunk";
import {createStore,applyMiddleware} from"redux";
const middleware=[thunk];
const Store=createStore(mainReducer,{},applyMiddleware(...middleware));

export default Store;