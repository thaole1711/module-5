import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import { Toaster, toast } from "sonner";

function ContactForm() {
    const [form, setForm] = useState(
        {
            name: "",
            email: "",
            phone: "",
            CMND:"",
            dob:"",
            gender:"",
            national:"",
            hasInsurance:"",
            city:"",
            district:"",
            strict:"",
            company:"",

        }
    );
    const validationForm ={
        name:Yup.string().required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ\s]{2,}$/,"Nhập đúng định dạng vd: Nguyễn Văn A"),
        email:Yup.string().required("không được để trống")
            .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,"Nhập đúng định dạng mail. vd:example@gmail.com"),
        phone:Yup.string().required("không được để trống")
            .matches(/^(0|\+84)(\d{9})$/,"Nhập đúng định dạng sdt.vd:0/+84972******"),
        CMND:Yup.string().required("không được để trống")
            .matches(/^([0-9]{9}|[0-9]{12})$/, "CMND/CCCD phải gồm 9 hoặc 12 chữ số"),
        dob:Yup.date().required("không được để trống")
        .min(new Date(1990, 0, 1), "Ngày sinh phải sau năm 1990"),
        gender:Yup.string().required("không được để trống")
            .oneOf(["male", "female"], "Vui lòng chọn giới tính"),
        national: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ\s]{2,}$/, "Nhập đúng định dạng vd: Việt Nam hoặc Japan"),
        city: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ\s]{2,}$/, "Nhập đúng định dạng vd: Đà Nẵng"),
        district: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ\s]{2,}$/, "Nhập đúng định dạng vd:Bình Sơn"),
        strict: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ0-9\s,./-]{2,}$/, "Địa chỉ không hợp lệ"),
        company: Yup.string()
            .required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ0-9\s.,&()-]{2,}$/, "Tên công ty không hợp lệ,vd: ABC"),


    }
    const handleSubmit = (value, {isSubmitting, resetForm}) => {
        if (value !== "") {
            resetForm();
            toast.success(" Đăng ký thành công!");
        } else {
            toast.error(" Vui lòng nhập lại!");
        }
    }
    return (
        <>
            <div
                className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Tờ khai y tế</h1>
                <Formik
                    initialValues={form}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={Yup.object(validationForm)}
                >
                    <Form className="w-full flex flex-col gap-4">

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
                            <label htmlFor="CMND" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Số hộ chiếu/CMND</label>
                            <Field type="number" id="CMND"
                                   name="CMND"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"CMND"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="dob" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Năm sinh</label>
                            <Field type="date" id="dob"
                                   name="dob"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"dob"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <label className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                                Giới tính
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-1">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Nam</span>
                                </label>

                                <label className="flex items-center space-x-1">
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Nữ</span>
                                </label>
                            </div>

                            <ErrorMessage
                                name="gender"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="national" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Quốc tịch</label>
                            <Field type="text" id="national"
                                   name="national"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"national"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="company" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Công ty làm việc</label>
                            <Field type="text" id="company"
                                   name="company"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"company"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="department" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Bộ phận làm việc</label>
                            <Field type="text" id="department"
                                   name="department"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"department"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Field
                                type="checkbox"
                                id="hasInsurance"
                                name="hasInsurance"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                htmlFor="hasInsurance"
                                className="text-sm text-gray-700 dark:text-gray-200"
                            >
                                Có thẻ bảo hiểm y tế
                            </label>
                        </div>
                        <ErrorMessage
                            name="hasInsurance"
                            component="div"
                            className="text-red-500 text-sm"
                        />

                        <h2 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Địa chỉ liên lạc tại Việt Nam</h2>


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Tỉnh thành</label>
                            <Field
                                   id="city"
                                   name="city"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"city"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="district" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Quận/huyện</label>
                            <Field
                                id="district"
                                name="district"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"district"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="strict" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Số nhà,phố,tổ dân phố/thôn/đội</label>
                            <Field
                                id="strict"
                                name="strict"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"strict"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email"
                                   className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email</label>
                            <Field type="email" id="email"
                                   name="email"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"email"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className=" flex items-start flex-col justify-start">
                            <label htmlFor="phone"
                                   className="text-sm text-gray-700 dark:text-gray-200 mr-2">Số điện thoại</label>
                            <Field type="text" id="phone"
                                   name="phone"
                                   className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                            <ErrorMessage
                                name={"phone"}
                                component={"div"}
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div>
                            <label className="font-semibold block mb-2">
                                Trong vòng 14 ngày qua, Anh/Chị có đến quốc gia / vùng lãnh thổ nào
                                (Có thể đi qua nhiều quốc gia)
                            </label>
                            <Field
                                as="textarea"
                                name="countries"
                                className="w-full p-2 border rounded-md"
                            />
                            <ErrorMessage
                                name="countries"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Triệu chứng */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện dấu hiệu nào sau
                                đây không?
                            </label>
                            <div role="group" className="space-y-1">
                                {["Sốt", "Ho", "Khó thở", "Viêm phổi", "Đau họng", "Mệt mỏi"].map(
                                    (symptom) => (
                                        <label key={symptom} className="flex items-center space-x-2">
                                            <Field type="checkbox" name="symptoms" value={symptom} />
                                            <span>{symptom}</span>
                                        </label>
                                    )
                                )}
                            </div>
                            <ErrorMessage
                                name="symptoms"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Tiếp xúc */}
                        <div>
                            <label className="font-semibold block mb-2">
                                Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với?
                            </label>
                            <div role="group" className="space-y-1">
                                {[
                                    "Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19",
                                    "Người từ nước có bệnh COVID-19",
                                    "Người có biểu hiện (Sốt, ho, khó thở, viêm phổi)",
                                ].map((contact) => (
                                    <label key={contact} className="flex items-center space-x-2">
                                        <Field type="checkbox" name="contacts" value={contact} />
                                        <span>{contact}</span>
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage
                                name="contacts"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"> Đăng kí
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}
export default ContactForm