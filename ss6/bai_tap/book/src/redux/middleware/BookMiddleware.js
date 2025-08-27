import * as bookService from "../service/BookService.js"
import {addBook, getAllBooksByTitle} from "../../service/BookService.js";
import {ADD_BOOKS, RESET_BOOKS} from "../Constant.js";
export const getAllBookMiddleware = () => async (dispatch) => {
    try {
        const books = await bookService.getAllBooksByTitle(); // gọi API
        dispatch({
            type: RESET_BOOKS,   // type reset danh sách
            payload: books       // dữ liệu lấy được
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};
export const addBookMiddleware = (book) => async (dispatch) => {
    try {
        const temp = await bookService.addBook(book); // gọi API thêm sách
        dispatch({
            type: ADD_BOOKS,
            payload: temp      // dữ liệu sách vừa thêm
        });
    } catch (error) {
        console.error("Error adding book:", error);
    }
};