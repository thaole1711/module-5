import React from "react";
import {useNavigate} from "react-router-dom";


 function Home() {
     const navigate=useNavigate();
    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to User App</h1>
            <button onClick={()=>navigate("/users")}>Đi đến trang quản lý </button>
        </div>
    );
}
export default Home