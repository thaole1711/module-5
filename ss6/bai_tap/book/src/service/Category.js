import axios from "axios";


const API_URL = "http://localhost:3000/categories"

export const getAllCategogies = async () => {
    try {
        const result = await axios.get(API_URL);
        return result.data;
    } catch (error) {
        return [];
    }
};