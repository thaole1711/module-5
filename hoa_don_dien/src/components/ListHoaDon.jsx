import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as hoaDonService from "../service/HoaDonService.js";
import {toast} from "sonner";

function ListHoaDon() {
    const [hoaDon, setHoaDon] = useState([]);
    const [selectedHoaDon, setSelectedHoaDon] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ten, setTen] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const getAllHoaDon = async () => {
            const temp = await hoaDonService.getAllHoaDon();
            setHoaDon(temp);
        }
        getAllHoaDon();
    }, []);
    // xoa
    const cancelDelete = () => {
        setSelectedHoaDon(null);
        setShowModal(false);
    };

    const confirmDelete = async () => {
        if (selectedHoaDon) {
            const success = await hoaDonService.deleteHoaDon(selectedHoaDon.id);
            if (success) {
                setHoaDon(hoaDon.filter((hoaDon) => hoaDon.id !== selectedHoaDon.id));
                toast.success("Xóa thành công");
            } else {
                toast.error("Không tìm thấy hóa đơn muốn xóa");
            }
            setSelectedHoaDon(null);
            setShowModal(false);
        }
    };
    useEffect(() => {
        const getAllBook = async () => {
            if (search) {
                const temp = await hoaDonService.getAllHoaDonByMa(search.trim())

                setHoaDon(temp);
            } else if (ten) {
                const temp1 = await hoaDonService.getAllHoaDonByTen(ten.trim());
                setHoaDon(temp1);
            }

        }
        getAllBook();
    }, [search, ten]);
    const handleTop3 = async () => {
        const top3 = await hoaDonService.getTop3TongTien();
        setHoaDon(top3);
    };
    return (
        <>
            <div className="h-screen bg-gray-50 p-8 mt-16 overflow-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    QUẢN LÝ HÓA ĐƠN TIỀN ĐIỆN
                </h2>

                {/* --- HÀNG 1: Thêm mới + Top 5 --- */}
                <div className="flex justify-start gap-3 mb-6">
                    <button
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
                        onClick={() => navigate("/add")}
                    >
                        ➕ Thêm mới
                    </button>
                    <button
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
                        onClick={handleTop3}
                    >
                        Top 5
                    </button>
                </div>

                {/* --- HÀNG 2: Tìm kiếm --- */}
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

                    {/* Tìm theo mã */}
                    <input
                        type="text"
                        placeholder="🔍 Tìm theo mã..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Tìm theo tên */}
                    <input
                        type="text"
                        placeholder="🔍 Tìm theo tên..."
                        value={ten}
                        onChange={(e) => setTen(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/*    /!* Chọn loại *!/*/}
                    {/*    <select*/}
                    {/*        value={selectedCategory}*/}
                    {/*        onChange={(e) => setSelectedCategory(e.target.value)}*/}
                    {/*        className="w-full px-4 py-2 border border-gray-300 rounded-lg"*/}
                    {/*    >*/}
                    {/*        <option value="">-- Tất cả loại --</option>*/}
                    {/*        {categogies.map((c) => (*/}
                    {/*            <option key={c.id} value={c.id}>*/}
                    {/*                {c.name}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}


                </div>

                {/* --- Bảng sách + phân trang giữ nguyên --- */}


                {/* Danh sách */}
                {hoaDon.length === 0 ? (
                    <p className="text-gray-600 text-center mt-8">Không có hóa đơn</p>
                ) : (


                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-blue-600 text-white text-sm text-center">
                                <th className="py-3 px-4 border-r border-blue-500">STT</th>
                                <th className="py-3 px-4 border-r border-blue-500">Mã hóa đơn</th>

                                <th className="py-3 px-4 border-r border-blue-500">
                                    Số lượng
                                </th>

                                <th className="py-3 px-4 border-r border-blue-500">Giá</th>
                                <th className="py-3 px-4 border-r border-blue-500">Tháng</th>
                                <th className="py-3 px-4 border-r border-blue-500">Tổng tiền</th>
                                <th className="py-3 px-4 border-r border-blue-500">Khách hàng</th>
                                <th className="py-3 px-4">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {hoaDon.map((hoaDon, index) => (
                                <tr
                                    key={hoaDon.id}
                                    className="text-center text-gray-800 hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{hoaDon.ma}</td>
                                    <td className="py-3 px-4 border-b">{hoaDon.soLuong}</td>
                                    <td className="py-3 px-4 border-b">{hoaDon.donGia}</td>
                                    {/*<td className="py-3 px-4 border-b">  {new Date(hoaDon.thang).toLocaleDateString("vi-VN")}</td>*/}
                                    <td className="py-3 px-4 border-b">
                                        {new Date(hoaDon.thang).toLocaleDateString("vi-VN", {
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </td>
                                    {/*<td className="py-3 px-4 border-b">{hoaDon.soLuong * hoaDon.donGia}</td>*/}
                                    <td className="py-3 px-4 border-b"> {Math.round(hoaDon.soLuong * hoaDon.donGia)}</td>

                                    <td className="py-3 px-4 border-b">{hoaDon.khachHang.ten}</td>
                                    <td className="py-3 px-4 border-b flex justify-center gap-2">
                                        <button
                                            className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
                                            onClick={() => navigate(`/update/${hoaDon.id}`)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                                            onClick={() => {
                                                setSelectedHoaDon(hoaDon);
                                                setShowModal(true);
                                            }}
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/*Phân trang*/}
                {/*{totalPages > 1 && (*/}
                {/*    <div className="flex justify-center mt-6 space-x-2">*/}
                {/*        <button*/}
                {/*            onClick={() => page > 1 && setPage(page - 1)}*/}
                {/*            className="px-3 py-1 border rounded disabled:opacity-50"*/}
                {/*            disabled={page === 1}*/}
                {/*        >*/}
                {/*            ⬅️*/}
                {/*        </button>*/}

                {/*        {[...Array(totalPages)].map((_, i) => (*/}
                {/*            <button*/}
                {/*                key={i}*/}
                {/*                onClick={() => setPage(i + 1)}*/}
                {/*                className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-600 text-white" : ""}`}*/}
                {/*            >*/}
                {/*                {i + 1}*/}
                {/*            </button>*/}
                {/*        ))}*/}

                {/*        <button*/}
                {/*            onClick={() => page < totalPages && setPage(page + 1)}*/}
                {/*            className="px-3 py-1 border rounded disabled:opacity-50"*/}
                {/*            disabled={page === totalPages}*/}
                {/*        >*/}
                {/*            ➡️*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/* Modal xác nhận*/}
                {showModal && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                            <h2 className="text-lg font-semibold text-center mb-3">
                                Xóa <span className="text-red-600">{selectedHoaDon?.ma}</span>?
                            </h2>
                            <p className="text-gray-600 text-center mb-5">
                                Bạn có chắc chắn muốn xóa hóa Đơn này không?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListHoaDon;