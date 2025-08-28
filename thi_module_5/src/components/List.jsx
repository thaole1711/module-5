import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as productService from "../service/ProductService.js";
import {toast} from "sonner";
import * as categoryService from "../service/CategoryService.js";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState({
        title: "",
        categoryId: "",
    });
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await productService.searchProducts(
                search.title,
                search.categoryId,
            );
            setProducts(result);
        };

        fetchProducts();
    }, [search]);
    useEffect(() => {
        const getAllCategories = async () => {
            const temp = await categoryService.getAllCategories();
            setCategories(temp);
        }
        getAllCategories();
    }, []);

    useEffect(() => {
        const getAllProducts = async () => {
            const temp = await productService.getAllProducts();
            setProducts(temp);
        }
        getAllProducts();
    }, []);

    return (
        <>
            <div className="h-screen bg-gray-50 p-8 mt-16 overflow-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Danh sách sản phẩm
                </h2>

                {/* --- HÀNG 1: Thêm mới + Top 5 --- */}
                <div className="flex justify-start gap-3 mb-6">
                    <button
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
                        onClick={() => navigate("/add")}
                    >
                        ➕ Thêm mới
                    </button>

                </div>

                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="🔍 Tìm theo tên..."
                        value={search.title}
                        onChange={(e) => setSearch({...search, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <select
                        value={search.categoryId}
                        onChange={(e) => setSearch({...search, categoryId: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">-- Tất cả loại --</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>


                </div>

                {/* Danh sách */}
                {products.length === 0 ? (
                    <p className="text-gray-600 text-center mt-8">Không có sản phẩm</p>
                ) : (


                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-blue-600 text-white text-sm text-center">
                                <th className="py-3 px-4 border-r border-blue-500">STT</th>
                                <th className="py-3 px-4 border-r border-blue-500">Mã sản phẩm</th>
                                <th className="py-3 px-4 border-r border-blue-500">Tên sản phẩm</th>

                                <th className="py-3 px-4 border-r border-blue-500">
                                    Số lượng
                                </th>
                                <th className="py-3 px-4 border-r border-blue-500">Ngày nhập</th>
                                <th className="py-3 px-4 border-r border-blue-500">Giá</th>
                                <th className="py-3 px-4 border-r border-blue-500">Thể Loại</th>

                            </tr>
                            </thead>
                            <tbody>
                            {products.map((pro, index) => (
                                <tr
                                    key={pro.id}
                                    className="text-center text-gray-800 hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{pro.code}</td>
                                    <td className="py-3 px-4 border-b">{pro.title}</td>
                                    <td className="py-3 px-4 border-b">{pro.quantity}</td>
                                    <td className="py-3 px-4 border-b">  {new Date(pro.date).toLocaleDateString("vi-VN")}</td>

                                    <td className="py-3 px-4 border-b">{pro.price}</td>
                                    <td className="py-3 px-4 border-b">{pro.category.name}</td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListProduct