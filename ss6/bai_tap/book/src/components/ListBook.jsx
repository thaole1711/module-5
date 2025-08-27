import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as bookService from "../service/BookService.js";
import {toast} from "sonner";
import {getBooksByPageSortedByQuantity} from "../service/BookService.js";
import * as categoryService from "../service/Category.js";

function ListBook() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    // phân trang
    const [page, setPage] = useState(1);
    const [limit] = useState(5); // mỗi trang 5 cuốn
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / limit);
    const [categogies, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // có phân trang
    useEffect(() => {
        const fetchBooks = async () => {
            const {data, total} = await bookService.getBooksByPageSortedByQuantity(page, limit);
            // data.sort((a, b) => b.quantity - a.quantity);
            setBooks(data);
            setTotal(total);
        };
        fetchBooks();
    }, [page, limit]);
// loại sách
    useEffect(() => {
        const getAllCategories = async () => {
            const temp = await categoryService.getAllCategogies();
            setCategories(temp);
        }
        getAllCategories();
    }, []);
    useEffect(() => {
        const getBookOfCategory = async () => {
            if (selectedCategory) {
                const temp = await bookService.getAllBooksByCategory(selectedCategory);
                setBooks(temp);
            }
        }
        getBookOfCategory();
    }, [selectedCategory]);
// hiển thị top 5

    const handleTop3 = async () => {
        try {
            const top3 = await bookService.getTop5BooksByQuantity();
            setBooks(top3);
        } catch (error) {
            toast.error("hiển thị top 3 thấy bại")
        }

    };


// tìm kiếm sách theo tên và code(code có bấm nút)
    useEffect(() => {
        const getAllBook = async () => {
            if (keyword) {
                const temp = keyword.trim()
                    ? await bookService.getAllBooksByCode(keyword.trim())
                    : await bookService.getAllBooksByCode("");
                setBooks(temp);
            } else if (searchTitle) {
                const temp1 = await bookService.getAllBooksByTitle(searchTitle);
                setBooks(temp1);
            }

        }
        getAllBook();
    }, [keyword, searchTitle]);
    // tìm kiếm theo ngày
    useEffect(() => {
        const getDateBook = async () => {
            if (startDate && endDate) {
                const temp = await bookService.getBookByDate(startDate, endDate);
                setBooks(temp);
            }
        }
        getDateBook();
    }, [startDate, endDate]);


    const cancelDelete = () => {
        setSelectedBook(null);
        setShowModal(false);
    };

    const confirmDelete = async () => {
        if (selectedBook) {
            const success = await bookService.deleteBook(selectedBook.id);
            if (success) {
                setBooks(books.filter((book) => book.id !== selectedBook.id));
                toast.success("Xóa thành công");
            } else {
                toast.error("Không tìm thấy sách muốn xóa");
            }
            setSelectedBook(null);
            setShowModal(false);
        }
    };

    return (
        <>
        <div className="h-screen bg-gray-50 p-8 mt-16 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📚 Danh sách sách
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
                {/* Tìm theo ngày */}
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

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
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Chọn loại */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="">-- Tất cả loại --</option>
                    {categogies.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* Nút tìm */}
                <button
                    onClick={() => setKeyword(search.trim())}
                    className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Tìm
                </button>
            </div>

            {/* --- Bảng sách + phân trang giữ nguyên --- */}



        {/* Danh sách */}
                {books.length === 0 ? (
                    <p className="text-gray-600 text-center mt-8">Không có sách</p>
                ) : (


                            <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-blue-600 text-white text-sm text-center">
                                <th className="py-3 px-4 border-r border-blue-500">STT</th>
                                <th className="py-3 px-4 border-r border-blue-500">Mã sách</th>
                                <th className="py-3 px-4 border-r border-blue-500">Tên sách</th>

                                <th className="py-3 px-4 border-r border-blue-500">
                                    Số lượng
                                </th>
                                <th className="py-3 px-4 border-r border-blue-500">Ngày nhập</th>
                                <th className="py-3 px-4 border-r border-blue-500">Giá</th>
                                <th className="py-3 px-4 border-r border-blue-500">Loại</th>
                                <th className="py-3 px-4">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.map((book, index) => (
                                <tr
                                    key={book.id}
                                    className="text-center text-gray-800 hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{book.code}</td>
                                    <td className="py-3 px-4 border-b">{book.title}</td>
                                    <td className="py-3 px-4 border-b">{book.quantity}</td>
                                    <td className="py-3 px-4 border-b">  {new Date(book.date).toLocaleDateString("vi-VN")}</td>

                                    <td className="py-3 px-4 border-b">{book.price}</td>
                                    <td className="py-3 px-4 border-b">{book.category.name}</td>
                                    <td className="py-3 px-4 border-b flex justify-center gap-2">
                                        <button
                                            className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition"
                                            onClick={() => navigate(`/update/${book.id}`)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                                            onClick={() => {
                                                setSelectedBook(book);
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
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => page > 1 && setPage(page - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={page === 1}
                        >
                            ⬅️
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-600 text-white" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => page < totalPages && setPage(page + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={page === totalPages}
                        >
                            ➡️
                        </button>
                    </div>
                )}
                {/* Modal xác nhận */}
                {showModal && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                            <h2 className="text-lg font-semibold text-center mb-3">
                                Xóa <span className="text-red-600">{selectedBook?.title}</span>?
                            </h2>
                            <p className="text-gray-600 text-center mb-5">
                                Bạn có chắc chắn muốn xóa sách này không?
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

export default ListBook;
