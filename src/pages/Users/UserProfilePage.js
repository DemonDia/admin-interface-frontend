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
                    <h4>User information</h4>
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
                </div>
                <div className="card profileContainer">
                    <h3>User guides</h3>
                    <ul
                        className="nav nav-tabs"
                    >
                        <li
                            className="nav-item"
                            id="integrationGuide"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-integrationGuide"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-integrationGuide"
                            aria-selected="true"
                        >
                            <Link className="nav-link" style = {{color:"#0011A7"}}>Integration Guide</Link>
                            
                        </li>
                        <li
                            className="nav-item"
                            id="apiGuide"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-apiGuide"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-apiGuide"
                            aria-selected="false"
                        >
                           <Link className="nav-link" style = {{color:"#0011A7"}}>API Guide</Link>
                        </li>
                    </ul>

                    <div className="tab-content" id="v-pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="v-pills-integrationGuide"
                            role="tabpanel"
                            aria-labelledby="v-pills-integrationGuide"
                            tabindex="0"
                        >
                            <ol className="list-group list-group-numbered guideSteps">
                                <li className="list-group-item">
                                    Create a .env file (This stores your
                                    environment variables) in the root of your
                                    site directory.
                                </li>
                                <li className="list-group-item">
                                    Copy your user ID as show below.
                                    <br></br>
                                    <label>
                                        User ID:{" "}
                                        <b>(Please do NOT share this)</b>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            value={userId}
                                            type={
                                                !displayId ? "password" : "text"
                                            }
                                            onChange={(e) => {
                                                setUserId(e.target.value);
                                            }}
                                            disabled
                                        />
                                        <Link
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    userId
                                                );
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
                                                {!displayId ? (
                                                    <MaskIcon />
                                                ) : (
                                                    <UnmaskIcon />
                                                )}
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    Save it as "USER_ID" in your .env file. (Add
                                    a "REACT_APP_" such that it is saved as
                                    "REACT_APP_USER_ID" if your site is created
                                    with React.js)
                                </li>
                                <li className="list-group-item">
                                    Save the link below as "SERVER" in your .env
                                    file. (Add a "REACT_APP_" such that it is
                                    saved as "REACT_APP_SERVER" if your site is
                                    created with React.js). This allows you to
                                    fetch the data from your account into your
                                    portfolio site.
                                    <br></br>
                                    <label>Server link:</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            value={
                                                process.env
                                                    .REACT_APP_BACKEND_API
                                            }
                                            disabled
                                        />
                                        <Link
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    process.env
                                                        .REACT_APP_BACKEND_API
                                                );
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
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    Remember to put the variables as mentioned
                                    into the environment variables on the
                                    services you use to deploy your portfolio
                                    sites!<br></br>
                                </li>
                                <li className="list-group-item">
                                    Refer the API guide in the next tab and you
                                    are all set!
                                </li>
                            </ol>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="v-pills-apiGuide"
                            role="tabpanel"
                            aria-labelledby="v-pills-apiGuide"
                            tabindex="0"
                        >
                            ...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
