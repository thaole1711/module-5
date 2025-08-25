import {useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as customerService from "../service/Customers.js"
import {useNavigate} from "react-router-dom";

function AddCustomer() {
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        date:"",
        rank: ""
    })
    const navigate = useNavigate();
    const handleSubmit = (value, {isSubmitting, resetForm}) => {
        customerService.addCustomer(value);
        navigate("/");

    }
    const validationCustomer = {
        name: Yup.string().required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ\s]{2,}$/, "Nhập đúng định dạng vd: Nguyễn Văn A"),
        phone:Yup.string().required("không được để trống")
            .matches(/^(0|\+84)(\d{9})$/,"Nhập đúng định dạng sdt.vd:0/+84972******"),
        email:Yup.string().required("không được để trống")
            .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,"Nhập đúng định dạng mail. vd:example@gmail.com"),
        rank: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ0-9\s.,&()-]{2,}$/, "Tên công ty không hợp lệ,vd: ABC"),
        date:Yup.date().required("không được để trống")
            .min(new Date(2000, 1, 1), "Ngày sinh phải sau năm 2000"),

    }
    return (
        <>
            <div
                className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                    Thêm mới khách hàng
                </h1>
                <Formik
                    initialValues={customer}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={Yup.object(validationCustomer)}
                >
                    <Form className="w-full flex flex-col gap-4">

                        {/* Họ và tên */}
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Họ và tên
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"name"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        {/* Username */}
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Số điện thoại
                            </label>
                            <Field
                                type="text"
                                id="phone"
                                name="phone"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"phone"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        {/* Email */}
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Email:
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"email"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="date" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                               Ngày:
                            </label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"date"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="rank" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Loại:
                            </label>
                            <Field
                                type="rank"
                                id="rank"
                                name="rank"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"rank"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                        >
                            Register
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default AddCustomer;
