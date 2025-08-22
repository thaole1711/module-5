
import './App.css'
import ContactForm from "./components/Form.jsx";
import { Toaster, toast } from "sonner";
import {BrowserRouter, Route, Routes} from "react-router-dom";
function App() {


  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={ <ContactForm/>}/>
            </Routes>
        </BrowserRouter>
        <Toaster richColors  position="top-right" />
    </>
  )
}

export default App
