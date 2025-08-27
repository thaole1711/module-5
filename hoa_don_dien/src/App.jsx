
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListHoaDon from "./components/ListHoaDon.jsx";
import {Toaster} from "sonner";
import AddHoaDon from "./components/AddHoaDon.jsx";
import UpdateHoaDon from "./components/UpDateHoaDon.jsx";

function App() {
    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path={"/"} element={<ListHoaDon/>}></Route>
                    <Route path={"/add"} element={<AddHoaDon/>}></Route>
                    <Route path={"/update/:id"} element={<UpdateHoaDon/>}></Route>
                </Routes>
            </BrowserRouter>
            <Toaster richColors  position="top-right" />
        </>
    )
}
export default App
