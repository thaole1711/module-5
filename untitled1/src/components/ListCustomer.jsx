import {useState} from "react";
import Customers from "../data/Customers.jsx";

function ListCustomer(){

    const [customers, setCustomers] = useState(Customers);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const deleteCutomer = (cus) => {
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


    return (
        <>
            <div className="bg-white p-8 overflow-auto mt-16 h-screen">
                <h2 className="text-2xl mb-4"> Danh sách khách hàng</h2>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                    onClick={addCustomer}> Thêm
                </button>
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