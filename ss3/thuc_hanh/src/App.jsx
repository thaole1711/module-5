import { useState} from "react";
import Home from "./components/Home.jsx";
function App() {
    const [isLoggerdIn, setisLoggerdIn]=useState(false);
 const  handleLogIn=()=>{
    setisLoggerdIn(true);
}
    const  handleLogOut =()=>{
        setisLoggerdIn(false);
    }
    // const [before,setBefore]=useState({color:"blue"});
    // useEffect(() => {
    //     const time = setTimeout(() => {
    //         setBefore({color: "pink"});
    //     }, 3000);
    //
    //     return () => clearTimeout(time);
    // },[]);
    return(
        <>
          <div style={{textAlign:"center",marginTop:"50px"}}></div>
            {isLoggerdIn?(
                <Home onLogOut={handleLogOut}/>
            ):(<div>
                <h1>Please Login</h1>
                <button onClick={handleLogIn}>Login</button>
            </div>)}
            {/*<div*/}
            {/*    style={{*/}
            {/*        backgroundColor: before.color,*/}
            {/*    paddingTop: 20,*/}
            {/*    width: 400,*/}
            {/*    height: 80,*/}
            {/*    margin: "auto",*/}
            {/*}}*/}
            {/*    />*/}

        </>
    )
}

export default App;