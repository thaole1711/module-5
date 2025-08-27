import { SET_USERS, REMOVE_USER } from "./Actions.js";

const userReducer = (users = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USERS:
            return payload;
        case REMOVE_USER:
            return users.filter(user => user.id !== payload);
        default:
            return users;
    }
};

export default userReducer;
