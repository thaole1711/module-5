import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const getUsers = async () => {
    try{
        const res = await axios.get(API_URL);
        return res.data;
    }catch (e){
        return e;
    }

};

export const deleteUser = async (id) => {
    try{
        await axios.delete(API_URL+`/${id}`);
        return id;
    }catch (e){
        return e;
    }

};