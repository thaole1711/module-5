import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentList from "./component/student/List.jsx";
import StudentCreate from "./component/student/Create.jsx";

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<StudentList/>}/>
                    <Route path={"/add"} element={<StudentCreate/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
