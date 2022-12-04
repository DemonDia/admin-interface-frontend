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
    const routes = [
        "/api/skills/:userId (Retrieves all your skills)",
        "/api/projects/:userId (Retrieves all your projects)",
        "/api/experience/:userId (Retrieves all your job/school experiences)",
        "/api/contact/:userId (Retrieves all your contact information)",
    ];
    const entities = [
        {
            entityName: "Skill",
            entityDescription: "A skill that you have",
            attributes: [
                {
                    attributeName: "skillName",
                    attributeType: "string",
                    attributeDesc: "The name of the skill",
                },
                {
                    attributeName: "year",
                    attributeType: "integer",
                    attributeDesc: "The year which you picked up the skill",
                },
            ],
        },
        {
            entityName: "Contact",
            entityDescription: "How you will be contacted",
            attributes: [
                {
                    attributeName: "contactName",
                    attributeType: "string",
                    attributeDesc:
                        "The name of the mode to contact you (eg: Email, etc",
                },
                {
                    attributeName: "contact",
                    attributeType: "string",
                    attributeDesc:
                        "Contact information (eg: your email, linkedin profile link, etc)",
                },
            ],
        },
    ];
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
                        tabIndex="0"
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
                                React.js). You can find it in the profile page.
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
                                use to deploy your portfolio sites!
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
                        tabIndex="0"
                        style={{ textAlign: "left" }}
                    >
                        <h5>API Routes</h5>
                        <br></br>
                        The API has the following routes{" "}
                        <b>(NOTE: They are READ only)</b>:<br></br>
                        <ul className="list-group guideSteps">
                            {routes.map((route, index) => {
                                return (
                                    <li key={index} className="list-group-item">
                                        {route}
                                    </li>
                                );
                            })}
                        </ul>
                        <br></br>
                        <b>
                            Note: userId refers to the userId that is inside
                            your .env file (USER_ID or REACT_APP_USER_ID)
                        </b>
                        <br></br>Eg: to get skills from the API, it will be:
                        `$&#123;process.env.SERVER&#125;/api/skills/$&#123;process.env.USER_ID&#125;`.
                        <h5>API Entities</h5>
                        <ul className="list-group guideSteps">
                            {entities.map((entity, index) => {
                                return (
                                    <>
                                        <li
                                            className="list-group-item"
                                            class="btn btn-primary"
                                            data-bs-toggle="collapse"
                                            href={
                                                "#" +
                                                entity.enntityName +
                                                "" +
                                                index
                                            }
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseExample"
                                            style={{
                                                background: "#0011A7",
                                                border: "0px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            {entity.entityName}
                                        </li>
                                        <div
                                            class="collapse"
                                            id={entity.enntityName + "" + index}
                                        >
                                            <div class="card card-body">
                                                Description:{" "}
                                                {entity.entityDescription}
                                                <br></br>
                                                It has the following attributes:
                                                <ul className="list-group guideSteps">
                                                    {entity.attributes.map(
                                                        (attribute, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    className="list-group-item"
                                                                >
                                                                    <h4>
                                                                        {
                                                                            attribute.attributeName
                                                                        }
                                                                    </h4>
                                                                    Data type:{" "}
                                                                    {
                                                                        attribute.attributeType
                                                                    }
                                                                    <br></br>
                                                                    Description:{" "}
                                                                    {
                                                                        attribute.attributeDesc
                                                                    }
                                                                    <br></br>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserGuide;
