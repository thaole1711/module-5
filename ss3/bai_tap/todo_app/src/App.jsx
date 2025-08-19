import './App.css'
import {useState} from "react";
import Add from "./components/Add.jsx";

function App() {
    const [list, setList] = useState([]);
    const handleAdd = (newItem) => {
        setList([...list, newItem]);
    }

    return (
        <div className="flex justify-center items-center min-h-screen gap-6 bg-gray-100">
            {/* Form thêm mới */}
            <div className="flex-1 max-w-md">
                <Add onAdd={handleAdd}/>
            </div>

            {/* Bảng danh sách */}
            <fieldset className="flex-1 max-w-md text-xl border-4 border-green-500 rounded-lg p-4 bg-white shadow-md h-80">
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
    )
}

export default App
