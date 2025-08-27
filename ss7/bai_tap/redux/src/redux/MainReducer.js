import {combineReducers} from "redux";
import userReducer from "./Reducer.js";
const mainReducer = combineReducers({
    users: userReducer,
    // teachers: teacherReducer,
    // username: usernameReducer
})

export default mainReducer;