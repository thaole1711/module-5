
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserList from "./components/UserList.jsx";
import Home from "./components/Home.jsx";
import {Toaster} from "sonner";

function App() {


  return (
    <>
<BrowserRouter>
  <Routes>
    <Route path={"/"} element={<Home/>}></Route>
    <Route path={"/users"} element={<UserList/>}></Route>
  </Routes>
</BrowserRouter>
      <Toaster richColors  position="top-right" />

    </>
  )
}

export default App
