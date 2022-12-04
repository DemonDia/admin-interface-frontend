import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipbaord } from "../../components/general/icons";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
function UserGuide(props) {
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate);
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="page">
            <h1>User Guides</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Guides
                    </li>
                </ol>
            </nav>
            <div className="card profileContainer">
                <ul className="nav nav-tabs">
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
                        <Link className="nav-link" style={{ color: "#0011A7" }}>
                            Integration Guide
                        </Link>
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
                        <Link className="nav-link" style={{ color: "#0011A7" }}>
                            API Guide
                        </Link>
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
                                Create a .env file (This stores your environment
                                variables) in the root of your site directory.
                            </li>
                            <li className="list-group-item">
                                Save it as "USER_ID" in your .env file. (Add a
                                "REACT_APP_" such that it is saved as
                                "REACT_APP_USER_ID" if your site is created with
                                React.js) You can find it in the profile page.
                            </li>
                            <li className="list-group-item">
                                Save the link below as "SERVER" in your .env
                                file. (Add a "REACT_APP_" such that it is saved
                                as "REACT_APP_SERVER" if your site is created
                                with React.js). This allows you to fetch the
                                data from your account into your portfolio site.
                                <br></br>
                                <label>Server link:</label>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        value={
                                            process.env.REACT_APP_BACKEND_API
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
                                Remember to put the variables as mentioned into
                                the environment variables on the services you
                                use to deploy your portfolio sites!<br></br>
                            </li>
                            <li className="list-group-item">
                                Refer the API guide in the next tab and you are
                                all set!
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
    );
}

export default UserGuide;
