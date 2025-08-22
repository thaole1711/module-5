
import './App.css'
import ListCustomer from "./components/ListCustomer.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import AddCustomer from "./components/AddCustomer.jsx";



function App() {


    return (
        <>
           <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<ListCustomer/>}></Route>
                  <Route path={"/add"} element={<AddCustomer/>}></Route>
              </Routes>
           </BrowserRouter>
        </>
    );
}

export default App
