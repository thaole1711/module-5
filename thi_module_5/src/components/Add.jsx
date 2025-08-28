import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as productService from "../service/ProductService.js";
import * as categoryService from "../service/CategoryService.js";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        code: "",
        title: "",
        quantity: 0,
        date: "",
        price: 0,
        description: "",
        category: ""
    })
    const [categogies, setCategories] = useState([]);
    useEffect(() => {
        const getAllCategories = async () => {
            const temp = await categoryService.getAllCategories();
            setCategories(temp);
        }
        getAllCategories();
    }, []);
    const handleSubmit = async (value, {setSubmitting, resetForm}) => {
        try {
            value.category = JSON.parse(value.category);
            const success = await productService.addProduct(value);
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


    const validationProduct = {
        code: Yup.string()
            .required("Không được để trống")
            .matches(/^PROD-\d{4}$/, "Mã sản phẩm phải theo định dạng PROD-XXXX (X là số)"),
        title: Yup.string().required("không được để trống")
            .matches(/^[A-Za-zÀ-ỹ0-9\s]{2,}$/, "Nhập đúng định tên sản phẩm.vd: Sách 123"),
        quantity: Yup.number()
            .typeError("Số lượng phải là số")
            .integer("Phải là số nguyên")
            .moreThan(0, "Phải lớn hơn 0")
            .required("Không được để trống"),
        price: Yup.number()
            .typeError("Giá phải là số")
            .moreThan(0, "Giá phải lớn hơn 0")
            .required("Không được để trống"),
        date: Yup.date()
            .max(new Date(), "Ngày không được lớn hơn ngày hiện tại")

            .required("Không được để trống"),
        category: Yup.string()
            .required("Không được để trống"),
        description: Yup.string()
        .required("Không được để trống")
    }
    return (
        <>
            <div
                className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="self-start bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                >
                    Quay về
                </button>
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                    Thêm mới sản phẩm
                </h1>
                <Formik
                    initialValues={product}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={Yup.object(validationProduct)}
                >
                    <Form className="w-full flex flex-col gap-4">
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="code" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Mã sản phẩm
                            </label>
                            <Field

                                type="text"
                                id="code"
                                name="code"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"code"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="title" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Tên
                                sản phẩm
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"title"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="quantity" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Số lượng
                            </label>
                            <Field
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"quantity"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="date" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Ngày nhập
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
                            <label htmlFor="price" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                                Giá
                            </label>
                            <Field
                                type="number"
                                id="price"
                                name="price"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"price"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="description" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                               Mô tả
                            </label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name={"description"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>
                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="category" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                               Thể loại
                            </label>
                            <Field
                                as="select"
                                id="category"
                                name="category"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 "
                            >
                                <option value="">Chọn loại</option>
                                {categogies.map((ca) => (
                                    <option
                                        key={ca.id}
                                        value={JSON.stringify(ca)}
                                        className="px-3 py-2 text-gray-800 dark:text-gray-200">{ca.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name={"category"}
                                component={"div"}
                                className="text-red-500 text-sm"/>
                        </div>


                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                        >
                            Thêm
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );

}

export default AddProduct
