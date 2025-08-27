import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as hoaDonService from "../service/HoaDonService.js";
import * as khachHangService from "../service/KhachHangService.js";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

function AddDonHang() {
    const [donHang, setDonHang] = useState({
        ma: "",
        soLuong: 0,
        donGia: 0,
        thang: "",
        khachHang: ""
    })
    const [khachHang, setKhachHang] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getAllKhachHang = async () => {
            const temp = await khachHangService.getAllKhachHang();
            setKhachHang(temp);
        }
        getAllKhachHang();
    }, []);
    const handleSubmit = async (value, {setSubmitting, resetForm}) => {
        try {
            value.khachHang = JSON.parse(value.khachHang);
            const success = await hoaDonService.addHoaDon(value);
            if (success) {
                toast.success("Thêm mới thành công");

                navigate("/");
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thêm mới");
        }
    };


    const validationDonHang = {
        ma: Yup.string()
            .required("Không được để trống")
            .matches(/^MHD-\d{4}$/, "Mã sách phải theo định dạng MS-XXXX (X là số)"),
        soLuong: Yup.number()
            .typeError("Số lượng phải là số")
            // .integer("Phải là số nguyên")
            .moreThan(0, "Phải lớn hơn 0")
            .required("Không được để trống"),
        donGia: Yup.number()
            .typeError("Giá phải là số")
            .moreThan(0, "Giá phải lớn hơn 0")
            .required("Không được để trống"),
        thang: Yup.date()
            // .matches(/^\d{4}-\d{2}$/, "Tháng không hợp lệ")
            .max(new Date(), "Ngày không được lớn hơn ngày hiện tại")
            .required("Không được để trống"),
        khachHang: Yup.string()
            .required("Không được để trống")
    }
    return (
        <>
            <div
                className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                    Thêm mới hóa đơn
                </h1>
                <Formik
                    initialValues={donHang}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={Yup.object(validationDonHang)}
                >
                    <Form className="w-full flex flex-col gap-4">
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="ma" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Mã dơn hàng
                            </label>
                            <Field
                                type="text"
                                id="ma"
                                name="ma"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"ma"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="soLuong" className="text-sm text-gray-700 dark:text-gray-200 mr-2"> Số
                                lượng(KW)
                            </label>
                            <Field
                                type="number"
                                id="soLuong"
                                name="soLuong"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"soLuong"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="donGia" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Đơn giá
                            </label>
                            <Field
                                type="number"
                                id="donGia"
                                name="donGia"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"donGia"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="thang" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Tháng
                            </label>
                            <Field
                                type="month"
                                id="thang"
                                name="thang"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"thang"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="khachHang" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                               Khách hàng
                            </label>
                            <Field
                                as="select"
                                id="khachHang"
                                name="khachHang"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 "
                            >
                                <option value="">Chọn loại</option>
                                {khachHang.map((khachHang) => (
                                    <option
                                        key={khachHang.id}
                                        value={JSON.stringify(khachHang)}
                                        className="px-3 py-2 text-gray-800 dark:text-gray-200">{khachHang.ten}</option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name={"khachHang"}
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

export default AddDonHang
