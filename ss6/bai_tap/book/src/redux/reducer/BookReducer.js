import {ADD_BOOKS,RESET_BOOKS}  from "../Constant.js";

const bookReducer=(books=[],action)=>{
    const{type,payload}=action;
    switch (type){
        case ADD_BOOKS:
            return[...books,payload];
        case RESET_BOOKS:
            return payload;
        case "DELETE_STUDENT":
            return books.filter(student => student.id !== payload);
        case "DELETE_ALL_BOOK":
            return [];
        default:
            return books;
    }
}

export default bookReducer;