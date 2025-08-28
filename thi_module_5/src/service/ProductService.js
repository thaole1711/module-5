import axios from "axios";


const API_URL = "http://localhost:3000/Products"

export const getAllProducts= async () => {
    try {
        const result = await axios.get(API_URL + `?_sort=title&_order=asc`);
        return result.data;
    } catch (error) {
        return [];
    }
};
export const addProduct = async (product) => {
    try {
        const result = await axios.post(API_URL, product);
        if (result.status === 201) {
            return result.data;

        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const searchProducts = async ( title, categoryId) => {
    try {
        let query = "";
        if (title) query += `&title_like=${title}`;
        if (categoryId) query += `&categoryId=${categoryId}`;
        if (query.startsWith("&")) {
            query = "?" + query.slice(1);
        }

        const result = await axios.get(API_URL + query);
        return result.data;
    } catch (error) {
        return [];
    }
};