import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddTodo from "./components/AddTodo.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<AddTodo/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
