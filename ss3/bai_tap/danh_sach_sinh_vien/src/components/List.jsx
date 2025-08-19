import Students from "../data/Students.jsx";
import {Component} from "react";

class Student extends Component {
    render() {
        return (
            <>
                <div className="bg-white p-8 overflow-auto mt-16 h-screen">
                    <h2 className="text-2xl mb-4"> Danh sách học sinh</h2>

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
                                        <span className="block py-2 px-3 border-r border-gray-300">Xếp loại</span>
                                    </th>
                                    <th className="p-4 text-xs md:text-sm">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Students.map((s, index) => (
                                    <tr className="border-b text-xs md:text-sm text-center text-gray-800" key={s.id}>
                                        <td className="p-2 md:p-4">{index + 1}</td>
                                        <td className="p-2 md:p-4">{s.name}</td>
                                        <td className="p-2 md:p-4">{s.phone}</td>
                                        <td className="p-2 md:p-4">{s.email}</td>
                                        <td className="p-2 md:p-4">{s.grade}</td>
                                        <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm">Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Student