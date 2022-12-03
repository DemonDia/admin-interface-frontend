import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function SendResetPasswordRequest(props) {
    const [email, setEmail] = useState("");
    const resetPassEmail = async () => {
        await axios
            .put(process.env.REACT_APP_BACKEND_API + "/api/users/resetpass", {
                email,
            })
            .then((res) => {
                alert("Password reset email sent.");
            })
            .catch((err) => {
                alert("Password reset email sent.");
            });
    };

    return (
        <div>
            <div className="card authForm">
                <div className="authFormTop">
                    <h1>Reset password</h1>
                </div>
                <div className="authFormContainer">
                    <label>Email:</label>
                    <input
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <Link
                    className="btn btn-primary authButton"
                    type="button"
                    onClick={() => {
                        resetPassEmail();
                    }}
                >
                    Proceed
                </Link>
                <br></br>
                <Link className="btn btn-secondary" type="button" to="/login">
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default SendResetPasswordRequest;
