
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./components/List.jsx";
import Add from "./components/Add.jsx";
import {Toaster} from "sonner";

function App() {

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path={"/"} element={<List/>}></Route>
                    <Route path={"/add"} element={<Add/>}></Route>
                </Routes>
            </BrowserRouter>
            <Toaster richColors  position="top-right" />
        </>
    )
}

export default App
