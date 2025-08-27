import axios from "axios";
const API_URL = "http://localhost:3001/khachHang"
export const getAllKhachHang= async (code) => {
    try {
        const result = await axios.get(API_URL);
        return result.data;
    } catch (error) {
        return [];
    }
};