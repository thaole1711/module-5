import * as userService from "../service/UserSerivce.js";
import {toast} from "sonner";


export const SET_USERS = "SET_USERS";
export const REMOVE_USER = "REMOVE_USER";


export const fetchUsers = () => async (dispatch) => {
    const data = await userService.getUsers();
    dispatch({
        type: SET_USERS,
        payload: data });
};

export const deleteUserById = (id) => async (dispatch) => {
    await userService.deleteUser(id);
    dispatch({ type: REMOVE_USER,
        payload: id });
   toast.success("xóa thành công");
};