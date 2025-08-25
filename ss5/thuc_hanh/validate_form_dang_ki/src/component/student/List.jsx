import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as studentService from "../../service/StudentService.js"

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getAllStudent=async ()=>{
            const temp = await  studentService.getAllStudents();
            setStudents(temp);
        }
        getAllStudent();
    }, [search]);
    return (
        <div>
            <div className="bg-white p-8 overflow-auto mt-16 h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Danh sách học sinh</h2>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={() => navigate("/add")}
                    >
                        ➕ Thêm mới
                    </button>
                </div>

                {students.length === 0 ? (
                    <p className="text-gray-600 text-center mt-10">Không có học sinh!</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                            <tr className="bg-blue-600 text-center text-xs md:text-sm font-medium text-white">
                                <th className="p-2 border-r border-gray-300">STT</th>
                                <th className="p-2 border-r border-gray-300">Tên</th>
                                <th className="p-2 border-r border-gray-300">Ngày sinh</th>
                                <th className="p-2 border-r border-gray-300">Điểm</th>
                                <th className="p-2 border-r border-gray-300">Địa chỉ</th>
                                <th className="p-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((stu, index) => (
                                <tr
                                    key={stu.id}
                                    className="border-b hover:bg-gray-100 text-xs md:text-sm text-center text-gray-700 transition"
                                >
                                    <td className="p-2 md:p-3">{index + 1}</td>
                                    <td className="p-2 md:p-3">{stu.name}</td>
                                    <td className="p-2 md:p-3">{stu.dob}</td>
                                    <td className="p-2 md:p-3">{stu.point}</td>
                                    <td className="p-2 md:p-3">{stu.address}</td>
                                    <td className="p-2 md:p-3 flex justify-center space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs md:text-sm shadow hover:bg-yellow-600 transition">
                                            Edit
                                        </button>
                                        {/* <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm shadow hover:bg-red-600 transition"
                  onClick={() => deleteCustomer(stu)}
                >
                  Xóa
                </button> */}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentList