import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as studentService from "../../service/StudentService.js"
import * as Yup from "yup"

const StudentCreate = () => {
    const [student, setStudent] = useState({
        id: "",
        name: "",
        dob: "",
        point: 0,
        address: ""
    });
    const navigate = useNavigate();
    const handleSubmit = (value, {isSubmitting, resetForm}) => {
        studentService.addStudent(value);
        navigate("/")
    }
    const validationStudent = {
        id: Yup.number().required("id không được để trống"),
        name: Yup.string().required("tên không được để trống")
            .matches(/^[A-Za-z ]{3,}$/, "Tên phải đúng định dạng.  ...."),

    }

    return (
        <>
            <div
                className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Thêm mới học
                    sinh</h1>
                <Formik
                    initialValues={student}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={Yup.object(validationStudent)}
                >
                    <Form className="w-full flex flex-col gap-4">

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="id" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Mã học
                                sinh</label>
                            <Field type="text" id="id"
                                  name="id"
                                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"id"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Họ và
                                tên</label>
                            <Field type="text" id="name"
                                  name="name"
                                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"name"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="dob" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Ngày
                                sinh</label>
                            <Field type="date" id="dob"
                                  name="dob"
                                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"dob"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="point"
                                   className="text-sm text-gray-700 dark:text-gray-200 mr-2">Điểm</label>
                            <Field type="number" id="point"
                                  name="point"
                                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"point"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="address" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Địa
                                chỉ</label>
                            <Field type="text" id="address"
                                  name="address"
                                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"address"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">thêm mới
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}
export default StudentCreate;