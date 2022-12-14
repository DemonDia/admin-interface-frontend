import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginPageAuthCheck } from "../../AuthCheck";
function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = async () => {
        await axios
            .post(process.env.REACT_APP_BACKEND_API + "/api/users/login", {
                email,
                password,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    localStorage.setItem("loginToken", res.data.token);
                    alert("Logged in")
                    navigate("/home");
                }
            });
    };
    useEffect(() => {
        loginPageAuthCheck(navigate, axios);
    }, []);

    return (
        <div>
            <div className="card authForm">
                <div className="authFormTop">
                    <h1>Login</h1>
                </div>
                <div className="authFormContainer">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br></br>
                    <button
                        className="btn btn-primary authButton"
                        onClick={() => {
                            login();
                        }}
                    >
                        Sign In
                    </button>
                    <br></br>
                    Don't have an account? Register{" "}
                    <Link to="/register">here</Link>.
                    <br></br>
                    Forgot your password? Reset it{" "}
                    <Link to="/forgotpass">here</Link>.
                </div>
            </div>
        </div>
    );
}

export default Login;
