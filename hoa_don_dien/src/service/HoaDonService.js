import axios from "axios";

const API_URL = "http://localhost:3000/hoaDon"
export const getAllHoaDon = async (code) => {
    try {
        const result = await axios.get(API_URL);
        return result.data;
    } catch (error) {
        return [];
    }

};

export const getTop3TongTien = async (code) => {
    try {
        const result = await axios.get(API_URL);
        const hoaDonTotal = result.data.map(hd => ({
            ...hd, tongTien: hd.soLuong * hd.donGia
        }));
        const sort = hoaDonTotal.sort((a, b) => b.tongTien - a.tongTien);
        return sort.slice(0, 3);
    } catch (error) {
        return [];
    }

};
export const deleteHoaDon = async (id) => {
    try {
        await axios.delete(API_URL + `/${id}`);
        return true;
    } catch (error) {
        return false;
    }
};
export const addHoaDon = async (book) => {
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
};
export const getAllHoaDonByMa = async (ma) => {
    try {
        const result = await axios.get(API_URL + `?ma_like=${ma}`);
        return result.data;
    } catch (error) {
        return [];
    }

};
export const getAllHoaDonByTen = async (ten) => {
    try {
        const result = await axios.get(API_URL); // lấy toàn bộ trước
        return result.data.filter(
            (hoaDon) =>
                hoaDon.khachHang?.ten
                    ?.toLowerCase()
                    .includes(ten.toLowerCase())
        );
    } catch (error) {
        return [];
    }
};
export const findIdHoaDon = async (id) => {
    try {
        const result = await axios.get((API_URL + `/${id}`));
        return result.data;

    } catch (error) {
        return null;
    }
}
export const updateHoaDon = async (id, book) => {
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
export const searchBooksByFile = async (ten, search) => {
    try {

        let query = "";

        if (ten) query += `&ten_like=${ten}`;
        if (search) query += `&ma_like=${search}`;

        // luôn sort theo quantity desc
        // query += `&_sort=quantity&_order=desc`;

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

