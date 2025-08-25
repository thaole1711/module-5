import {useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as bookService from "../service/BookService.js"
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

function AddBook() {
    const [book, setBook] = useState({
        title: "",
        quantity: 0,

    })
    const navigate = useNavigate();
    const handleSubmit = async (value, {isSubmitting, resetForm}) => {
        const success = bookService.addBook(value);
        if (success) {
            toast.success("thêm mới thành công");
            navigate("/");
        } else {
            toast.success("thêm mới thất bại");
        }
    }




const validationBook = {
    title: Yup.string().required("không được để trống")
        .matches(/^[A-Za-zÀ-ỹ0-9\s]{2,}$/, "Nhập đúng định tên sách.vd: Sách 123"),
    quantity: Yup.number()
        .typeError("Số lượng phải là số")
        .integer("Phải là số nguyên")
        .moreThan(0, "Phải lớn hơn 0")
        .required("Không được để trống")
}
return (
    <>
        <div
            className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
                Thêm mới sách
            </h1>
            <Formik
                initialValues={book}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={Yup.object(validationBook)}
            >
                <Form className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="title" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Tên sách
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

export default AddBook;
