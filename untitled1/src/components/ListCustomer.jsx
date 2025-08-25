import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as customerService from "../service/Customers.js"

function ListCustomer() {

    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const deleteCutomer = (cus) => {
        customerService.deleteCustomer(cus.id);
        setSelectedCustomer(cus);
        setShowModal(true);
    };
    const confirmDelete = () => {
        if (selectedCustomer) {
            setCustomers(customers.filter(cus => cus.id !== selectedCustomer.id));
            setSelectedCustomer(null);
            setShowModal(false);
        }
    };
    const cancelDelete = () => {
        setSelectedCustomer(null);
        setShowModal(false);
    }
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const normalizeText = (s) =>
        (s ?? "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    useEffect(() => {
const getAllCustomer=async ()=>{
    let temp = await customerService.getAllCustomers();
    setCustomers(temp);
}
getAllCustomer()

    }, [search]);


    return (
        <>
            <div className="bg-white p-8 overflow-auto mt-16 h-screen">
                <h2 className="text-2xl mb-4"> Danh sách khách hàng</h2>
                <button
                    className="px-4 py-2 m-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition "
                    onClick={() => navigate("/add")}
                >➕ Thêm mới
                </button>

            {/*    <div className="h-screen flex w-full justify-center items-center dark:bg-gray-800">*/}
            {/*        <div className="flex relative rounded-md w-full px-4 max-w-xl">*/}
            {/*            <input type="text" name="search" id="query" placeholder="Tìm kiếm theo tên..." value={search} onChange={(e)=>{setSearch(e.target.value)}}*/}
            {/*                   className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "/>*/}
            {/*            <button onClick={}*/}
            {/*                className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">*/}
            {/*                <span>Tìm kiếm</span>*/}
            {/*                <span className="hidden md:block">*/}
            {/*    <svg className="text-gray-200 h-5 w-5 p-0 fill-current" xmlns="http://www.w3.org/2000/svg"*/}
            {/*         xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"*/}
            {/*         viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"*/}
            {/*         width="512px" height="512px">*/}
            {/*        <path*/}
            {/*            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>*/}
            {/*    </svg>*/}
            {/*</span>*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*    </div>*/}
                <div className="relative overflow-auto">
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full bg-white border mb-20">
                            <thead>
                            <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">STT</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Tên</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">SDT</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Email</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Ngày</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Loại</span>
                                </th>
                                <th className="p-4 text-xs md:text-sm">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((cus, index) => (
                                <tr className="border-b text-xs md:text-sm text-center text-gray-800" key={cus.id}>
                                    <td className="p-2 md:p-4">{index + 1}</td>
                                    <td className="p-2 md:p-4">{cus.name}</td>
                                    <td className="p-2 md:p-4">{cus.phone}</td>
                                    <td className="p-2 md:p-4">{cus.email}</td>
                                    <td className="p-2 md:p-4">  {new Date(cus.date).toLocaleDateString("vi-VN")}</td>
                                    <td className="p-2 md:p-4">{cus.rank}</td>
                                    <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                                            onClick={() => deleteCutomer(cus)}>Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*xoa*/}
            {showModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold text-center mb-2">
                            Xóa {selectedCustomer?.name}
                        </h2>
                        <p className="text-gray-500 text-center mb-4">
                            Bạn có chắc chắn muốn xóa khách hàng này không?
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListCustomer