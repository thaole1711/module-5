
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListBook from "./components/ListBook.jsx";
import {Toaster} from "sonner";
import UpdateBook from "./components/UpdateBook.jsx";
import AddBook from "./components/AddBook.jsx";

function App() {

  return (
    <>
<BrowserRouter>

  <Routes>
    <Route path={"/"} element={<ListBook/>}></Route>
    <Route path={"/add"} element={<AddBook/>}></Route>
    <Route path={"/update/:id"} element={<UpdateBook/>}></Route>
  </Routes>
</BrowserRouter>
      <Toaster richColors  position="top-right" />
    </>
  )
}

export default App
