import React, { useState, useEffect } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { Link, useNavigate } from "react-router-dom";
import {
    UnmaskIcon,
    MaskIcon,
    CopyToClipbaord,
} from "../../components/general/icons";
import axios from "axios";
function UserProfilePage(props) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayId, setDisplayId] = useState(false);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                // await getExperiences(result.data.id);
                console.log(result.data);
                setUserId(result.data.id);
                setUserName(result.data.username);
                setEmail(result.data.email);
                setPhoneNumber(result.data.phoneNumber);
            }
        });
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
                    <label>Name:</label>
                    <input
                        className="form-control"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
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
                                class="input-group-text"
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
                                class="input-group-text"
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
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
