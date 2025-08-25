import { useState } from "react";
import {useNavigate} from "react-router-dom";
import * as todoService from "../service/TodoService.js"

function AddTodo() {
    const [list, setList] = useState([]);
    const [item, setItem] = useState("");
   const navigate=useNavigate();
    const handleAdd =async () => {
        if (item.trim() !== "") {
            setList([...list, item]);
            setItem("");
            todoService.addTodo({item});

        }
        navigate("/");
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen gap-6">
                {/* Form nhập */}
                <div className="h-80 px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md border">
                    <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
                        To do list
                    </p>
                    <textarea
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        className="h-40 px-3 text-sm py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm"
                        placeholder="Add your todo here"
                    ></textarea>

                    <div className="flex justify-between mt-2">
                        <button
                            className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Bảng danh sách */}
                <fieldset className="flex-1 max-w-md text-xl border-4 border-green-500 rounded-lg p-4 bg-white shadow-md h-80 w-[700px]">
                    <legend className="px-2 text-xl font-semibold underline decoration-green-500/60 decoration-2">
                        Todo list
                    </legend>

                    <ul className="flex flex-col gap-2 px-2 text-md font-serif overflow-y-auto h-full">
                        {list.map((todo, index) => (
                            <li key={index}>{todo}</li>
                        ))}
                    </ul>
                </fieldset>
            </div>
</>
            );
}

export default AddTodo
