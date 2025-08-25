import axios from "axios";

const API_URL = "http://localhost:3000/books"

export const getAllBooksByTitle = async (title) => {
    try {
        const result = await axios.get(API_URL + `?title_like=${title}`);
        return result.data.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    } catch (error) {
        return [];
    }
};
export const deleteBook = async (id) => {
    try {
        await axios.delete(API_URL + `/${id}`);
        return true;
    } catch (error) {
        return false;
    }

};
export const addBook = async (book) => {
    try {
        const result = await axios.post(API_URL, book);
        if (result.status === 201) {
            return result.data;

        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const findIdBook = async (id) => {
    try {
        const result = await axios.get((API_URL + `/${id}`));
        return result.data;

    } catch (error) {
        return null;
    }
}
export const updateBook = async (id, book) => {
    try {
        const result = await axios.put(API_URL + `/${id}`, book);
        if (result.status === 200) {
            return result.data;

        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}