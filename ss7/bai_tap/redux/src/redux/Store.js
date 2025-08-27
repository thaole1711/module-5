import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import mainReducer from "./MainReducer.js";


const Store = createStore(mainReducer, applyMiddleware(thunk));

export default Store;
