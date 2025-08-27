import bookReducer from "./BookReducer.js";
import {combineReducers} from "redux";

const mainReducer=combineReducers({
    books: bookReducer,
})
export default mainReducer;