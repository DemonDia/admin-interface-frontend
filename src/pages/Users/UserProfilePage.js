import React, { useState, useEffect, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { Link, useNavigate } from "react-router-dom";
import {
    UnmaskIcon,
    MaskIcon,
    CopyToClipbaord,
} from "../../components/general/icons";
import { NavbarContext } from "../../context/NavbarContext";
import axios from "axios";
function UserProfilePage(props) {
    const { setLoggedIn, loggedIn } = useContext(NavbarContext);
    const token = localStorage.getItem("loginToken");

    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayId, setDisplayId] = useState(false);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setLoggedIn(true);
                setUserId(result.data.id);
                setUserName(result.data.username);
                setEmail(result.data.email);
                setPhoneNumber(result.data.phoneNumber);
            }
        });
    };

    const saveUsername = async () => {
        if (!userName || userName.length == 0) {
            alert("Updated name cannot be blank");
        } else {
            axios
                .put(
                    process.env.REACT_APP_BACKEND_API + "/api/users/changename",
                    {
                        newUsername: userName,
                        id: userId,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Username successfully saved");
                    } else {
                        console.log(res.data);
                        alert("Failed to save");
                    }
                })
                .catch((err) => {
                    alert("Failed to save");
                });
        }
    };
    const savePassword = async () => {
        if (!newPassword) {
            alert("New password cannot be blank");
        } else if (newPassword.length < 8) {
            alert("New pasword must be at least 8 characters");
        } else if (!confirmNewPassword) {
            alert("Please type in your new password again.");
        } else if (newPassword != confirmNewPassword) {
            alert("Both passwords must match");
        } else {
            axios
                .post(
                    process.env.REACT_APP_BACKEND_API + "/api/users/changepass",
                    {
                        newPassword,
                        userId,
                        token,
                    }
                )
                .then((res) => {
                    setNewPassword("");
                    setConfirmNewPassword("");
                    alert("Password reset sucessfully.");
                })
                .catch((err) => {
                    alert("Failed to reset password");
                });
        }
    };
    const deleteAccount = async () => {
        var confirmDelete = prompt(
            "Are you sure? Type 'yes' to proceed. ALL your records will be gone FOREVER. This is IRREVERSABLE!"
        );
        if (confirmDelete == "yes") {
            await axios
                .delete(
                    process.env.REACT_APP_BACKEND_API +
                        `/api/users/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Account successfully deleted");
                        navigate("/logout")
                    } else {
                        console.log(res.data)
                        alert("Failed to delete");
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert("Failed to delete");
                });

        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <div className="page">
                <h1>Profile Page</h1>
                <nav
                    aria-label="breadcrumb"
                    className="breadcrumbContainer card"
                >
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Home</Link>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            Profile
                        </li>
                    </ol>
                </nav>
                <div className="card profileContainer">
                    <h4>User information</h4>
                    <label>Name:</label>
                    <div className="input-group">
                        <input
                            placeholder="Type new name"
                            className="form-control"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        <button
                            class="btn btn-primary addBtn"
                            onClick={() => {
                                saveUsername();
                            }}
                        >
                            Save Name
                        </button>
                    </div>
                    <label>User ID (please do NOT share this):</label>
                    <div className="input-group">
                        <input
                            className="form-control"
                            value={userId}
                            type={!displayId ? "password" : "text"}
                            onChange={(e) => {
                                setUserId(e.target.value);
                            }}
                            disabled
                        />
                        <Link
                            onClick={() => {
                                navigator.clipboard.writeText(userId);
                            }}
                        >
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                                style={{ height: "100%" }}
                            >
                                <CopyToClipbaord />
                            </span>
                        </Link>
                        <Link
                            onClick={() => {
                                setDisplayId(!displayId);
                            }}
                        >
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                                style={{ height: "100%" }}
                            >
                                {!displayId ? <MaskIcon /> : <UnmaskIcon />}
                            </span>
                        </Link>
                    </div>

                    <label>Email:</label>
                    <input className="form-control" value={email} disabled />
                    <label>Phone number:</label>
                    <input
                        className="form-control"
                        value={phoneNumber}
                        type="number"
                        disabled
                    />
                    <br></br>
                    <h6 style={{ textAlign: "left" }}>
                        <b>Only if you intend to change password</b>
                    </h6>
                    <label>New password:</label>
                    <input
                        className="form-control"
                        value={newPassword}
                        placeholder="New password must be at least 8 characters"
                        type="password"
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                    />
                    <label>Confirm change pasword:</label>
                    <input
                        className="form-control"
                        value={confirmNewPassword}
                        placeholder="Re-enter new password"
                        type="password"
                        onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                        }}
                    />
                    <br></br>
                    <button
                        className="btn btn-primary addBtn"
                        onClick={() => savePassword()}
                    >
                        Change Password
                    </button>
                    <br></br>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            deleteAccount();
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
