import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const register = () => {};

    return (
        <div>
            <div className="card authForm">
                <h1>Register</h1>
                <label>Username:</label>
                <input
                    className="form-control"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
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
                <label>Confirm password:</label>
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
                <button className="btn btn-primary">Register</button>
                <br></br>
                Already have an account? Click <Link to="/login">here</Link>.
            </div>
        </div>
    );
}

export default Register;
