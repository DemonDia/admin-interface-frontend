import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginPageAuthCheck } from "../../AuthCheck";
function Register(props) {
    const navigate = useNavigate();
    // username be >= 6 char
    const [userName, setUserName] = useState("");

    // valid email
    const [email, setEmail] = useState("");

    // password be >= 8 char
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    // ================helper functions================
    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };
    // ================core functions================
    const register = async () => {
        // check if valid email
        if (!validateEmail(email)) {
            alert("Invalid email");
        }
        // check if username >=6 char
        else if (userName.length < 6) {
            alert("Name must be at least 6 characters");
        }
        else if(/^\d+$/.test(phoneNumber) == false){
            alert("Invalid phone number");
        }
        // check if password >= 8 char
        else if (password.length < 8) {
            alert("Password must be at least 8 characters");
        } else if (!(password == confirmPassword)) {
            alert("Passwords must match");
        } else {
            await axios
                .post(
                    process.env.REACT_APP_BACKEND_API +
                        "/api/users/registration",
                    {
                        email,
                        username: userName,
                        password,
                        phoneNumber
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Account created");
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert("Account failed to create");
                });
        }
    };

    // ================ useeffect================
    useEffect(() => {
        loginPageAuthCheck(navigate, axios);
    }, []);

    return (
        <div>
            <div className="card authForm">
                <div className="authFormTop">
                    <h1>Sign Up</h1>
                </div>
                <div className="authFormContainer">
                    <label>Name:*</label>
                    <input
                        className="form-control"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <label>Phone Number:*</label>
                    <input
                        className="form-control"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                    <label>Email:*</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label>Password:*</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <label>Confirm password:*</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <br></br>
                    <button
                        className="btn btn-primary authButton"
                        onClick={() => {
                            register();
                        }}
                    >
                        Register
                    </button>
                    <br></br>
                    Already have an account? Click <Link to="/login">here</Link>
                    .
                </div>
            </div>
        </div>
    );
}

export default Register;
