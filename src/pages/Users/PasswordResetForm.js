import React, { useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function PasswordResetForm(props) {
    const [newPassword, setNewPassword] = useState("");
    const {userId,token} = useParams()
    const navigate = useNavigate();
    const resetPassword = async () => {
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters!");
        } else {
            axios
                .post(
                    process.env.REACT_APP_BACKEND_API + "/api/users/changepass",
                    {
                        newPassword,userId,token
                    }
                )
                .then((res) => {
                    alert("Password reset sucessfully.");
                    navigate("/login")
                })
                .catch((err) => {
                    alert("Failed to reset password");
                });
        }
    };
    return (
        <div>
            <div className="card authForm">
                <div className="authFormTop">
                    <h1>Reset password</h1>
                </div>
                <div className="authFormContainer">
                    <label>New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                    />
                </div>
                <Link
                    className="btn btn-primary authButton"
                    type="button"
                    onClick={() => {
                        resetPassword();
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

export default PasswordResetForm;
