import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookService from "../service/BookService.js";
import { toast } from "sonner";

function ListBook() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const getAllBook = async () => {
            const temp = keyword.trim()
                ? await bookService.getAllBooksByTitle(keyword.trim())
                : await bookService.getAllBooksByTitle("");
            setBooks(temp);
        };
        getAllBook();
    }, [keyword]);

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
            <div className="bg-gray-50 p-8 mt-16 h-screen overflow-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    📚 Danh sách sách
                </h2>

                <div className="flex justify-between items-center mb-6">
                    {/* Nút thêm mới */}
                    <button
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
                        onClick={() => navigate("/add")}
                    >
                        ➕ Thêm mới
                    </button>

                    {/* Ô tìm kiếm */}
                    <div className="flex w-full max-w-md ml-4">
                        <input
                            type="text"
                            name="search"
                            placeholder="🔍 Tìm kiếm theo tên..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            onClick={() => setKeyword(search.trim())}
                            className="px-5 py-2 bg-violet-600 text-white font-medium rounded-r-xl hover:bg-violet-700 transition"
                        >
                            Tìm
                        </button>
                    </div>
                </div>

                {/* Danh sách */}
                {books.length === 0 ? (
                    <p className="text-gray-600 text-center mt-8">Không có sách</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-blue-600 text-white text-sm text-center">
                                <th className="py-3 px-4 border-r border-blue-500">STT</th>
                                <th className="py-3 px-4 border-r border-blue-500">Tên sách</th>
                                <th className="py-3 px-4 border-r border-blue-500">
                                    Số lượng
                                </th>
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
                                    <td className="py-3 px-4 border-b">{book.title}</td>
                                    <td className="py-3 px-4 border-b">{book.quantity}</td>
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
