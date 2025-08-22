import {useState} from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const MESSAGE_ERROR = {
        username: "Username error",
        email: "Email error",
        password: "Password error",
        comfirmPassword: "Password must be the same"
    };
    const REGEX = {
        username: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[A-Za-z0-9!@#\\$%\\^&*\\)(+=._-]{6,}$/
    }
    const [form, setForm] = useState({});

    function HandleChange(event) {
        let error = "";
        if (event.target.name === "password") {
            if (form.comfirmPassword && form.comfirmPassword.value) {
                error = event.target.value === form.comfirmPassword.value ? "" : MESSAGE_ERROR[event.target.name];
            } else {
                error = REGEX[event.target.name].test(event.target.value)
                    ? ""
                    : MESSAGE_ERROR[event.target.name];
            }
        } else if (event.target.name === "confirmPassword") {
            error =
                event.target.value === form.password.value
                    ? ""
                    : MESSAGE_ERROR[event.target.name];
        } else {
            error = REGEX[event.target.name].test(event.target.value)
                ? ""
                : MESSAGE_ERROR[event.target.name];
        }
        setForm({
            ...form, [event.target.name]: event.target.value
        });
    }

    function handleSubmit() {
        const isValid =
            form.username && form.email && form.password && form.confirmPassword;
        alert(isValid ? "Sign in success!!!" : "Please fill out all the fields!!!");
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form>
                <div className="custom-input">
                    <label>Username </label>
                    <input name="username" value={form.username || ''} onChange={HandleChange}/>
                </div>
                <div className="custom-input">
                    <label>Email </label>
                    <input type="email" name="email" value={form.email || ''} onChange={HandleChange}/>
                </div>
                <div className="custom-input">
                    <label>Password </label>
                    <input type="password" name="password" value={form.password || ''} onChange={HandleChange}/>
                </div>
                <div className="custom-input">
                    <label>Confirm password </label>
                    <input type="password" name="confirmPassword" value={form.confirmPassword || ''}
                           onChange={HandleChange}/>
                </div>
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default App
