import axios from "axios";


const API_URL = "http://localhost:3001/books"

export const getAllBooksByCode= async (code) => {
    try {
        const result = await axios.get(API_URL + `?code_like=${code}&_sort=quantity&_order=desc`);
        return result.data;
    } catch (error) {
        return [];
    }
};
export const getAllBooksByCategory= async (categoryId) => {
    try {
        const result = await axios.get(API_URL + `?categoryId=${categoryId}&_sort=quantity&_order=desc`);
        return result.data.filter(book => book.category.id === Number(categoryId));
    } catch (error) {
        return [];
    }
};
export const getAllBooksByTitle= async (title) => {
    try {
        const result = await axios.get(API_URL + `?title_like=${title}&_sort=quantity&_order=desc`);
        return result.data;
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
export const getBookByDate=async (startDate,endDate)=>{
    try{
        const result=await axios.get(API_URL+`?date_gte=${startDate}&date_lte=${endDate}`);
        return result.data;
    }catch (error){
        return [];
    }
}


// 🔥 Phân trang và sắp xếp
export const getBooksByPageSortedByQuantity = async (page = 1, limit = 5) => {
    try {
        const result = await axios.get(API_URL+`?_page=${page}&_limit=${limit}&_sort=quantity&_order=desc`);
        const total = parseInt(result.headers['x-total-count'], 10);
        return { data: result.data, total };
    } catch (error) {
        return { data: [], total: 0 };
    }
};

// Sắp xếp
export const getBooksSortedByPriceDesc = async () => {
    try {
        const result = await axios.get(API_URL + "?_sort=price&_order=desc");
        return result.data;
    } catch (error) {
        return [];
    }
};
export const getTop5BooksByQuantity = async () => {
    try {
        const result = await axios.get(API_URL + `?_sort=quantity&_order=desc&_limit=3`);
        return result.data;
    } catch (error) {
        return [];
    }
};

/**
 * Lấy danh sách sách theo nhiều điều kiện kết hợp (URL param style)
 * @param {string} code       - mã sách
 * @param {string} title      - tên sách
 * @param {number} categoryId - id thể loại
 * @param {string} startDate  - ngày bắt đầu (YYYY-MM-DD)
 * @param {string} endDate    - ngày kết thúc (YYYY-MM-DD)
 */
export const searchBooks = async (code, title, categoryId, startDate, endDate) => {
    try {
        let query = "";

        if (code) query += `&code_like=${code}`;
        if (title) query += `&title_like=${title}`;
        if (categoryId) query += `&categoryId=${categoryId}`;
        if (startDate) query += `&date_gte=${startDate}`;
        if (endDate) query += `&date_lte=${endDate}`;

        // luôn sort theo quantity desc
        query += `&_sort=quantity&_order=desc`;

        // loại bỏ ký tự & đầu tiên, thay thành ?
        if (query.startsWith("&")) {
            query = "?" + query.slice(1);
        }

        const result = await axios.get(API_URL + query);
        return result.data;
    } catch (error) {
        return [];
    }
};