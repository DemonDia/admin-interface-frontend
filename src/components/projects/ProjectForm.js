import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ComponentRow from "./ComponentRow";
import DescriptionRow from "./DescriptionRow";
import ProjectLinkRow from "./ProjectLinkRow";
import TechStackRow from "./TechStackRow";
function ProjectForm(props) {
    const [projectName, setProjectName] = useState("");
    const [projectYear, setProjectYear] = useState(2022);
    const [description, setDescription] = useState([]);
    const [techStacks, setTechStacks] = useState([]);
    const [projectLinks, setProjectLinks] = useState([]);
    const [projectComponents, setProjectComponents] = useState([]);
    // ========================main functions========================
    // ========== add ==========
    const addProject = () => {};
    // ========== update ==========
    const updateProject = () => {};

    // =======================descriptions=======================
    const [descriptionPoint, setDescriptionPoint] = useState("");
    // ========== add ==========
    const addDescriptionPoint = () => {};
    // ========== update ==========
    const updateDescriptionPoint = () => {};
    // ========== delete ==========
    const deleteDescriptionPoint = () => {};

    // =======================tech stacks=======================
    const [techStack, setTechStack] = useState("");
    // ========== add ==========
    const addTechStack = () => {};
    // ========== update ==========
    const updateTechStack = () => {};
    // ========== delete ==========
    const deleteTechStack = () => {};

    // =======================project links=======================
    const [projectLinkName, setProjectLinkName] = useState("");
    const [projectLinkUrl, setProjectLinkUrl] = useState("");
    // ========== add ==========
    const addProjectLink = () => {};
    // ========== update ==========
    const updateProjectLink = () => {};
    // ========== delete ==========
    const deleteProjectLink = () => {};

    // =======================components=======================
    const [componentName, setComponentName] = useState("");
    const [componentLink, setComponentLink] = useState("");
    // ========== add ==========
    const addProjectComponent = () => {};
    // ========== update ==========
    const updateProjectComponent = () => {};
    // ========== delete ==========
    const deleteProjectComponent = () => {};

    return (
        <div className="card formContainer">
            <div className="row">
                <div className="col-6 col-sm-12">
                    <label>Project Name:*</label>
                    <input
                        className="form-control"
                        value={projectName}
                        placeholder="Add project name"
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </div>
                <div className="col-6 col-sm-12">
                    <label>Project Year:*</label>
                    <input
                        type="number"
                        className="form-control"
                        value={projectYear}
                        placeholder="Add project year"
                        onChange={(e) => setProjectYear(e.target.value)}
                    />
                </div>
                {/* ========================description======================== */}
                <div className="tableContainer">
                    <h6>Description</h6>
                    <hr></hr>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Description Points</th>
                                <th scope="col" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Add description point"
                                        className="form-control"
                                        value={descriptionPoint}
                                        onChange={(e) =>
                                            setDescriptionPoint(e.target.value)
                                        }
                                    />
                                </td>
                                <td colSpan={2}>
                                    <Link
                                        className="btn btn-primary addBtn"
                                        type="button"
                                        onClick={() => {
                                            addDescriptionPoint();
                                        }}
                                    >
                                        Add
                                    </Link>
                                </td>
                            </tr>
                            {description ? (
                                <>
                                    {description.map(
                                        (descriptionPoint, index) => {
                                            return (
                                                <DescriptionRow
                                                    description={
                                                        descriptionPoint
                                                    }
                                                    index={index}
                                                    saveChanges={
                                                        updateDescriptionPoint
                                                    }
                                                    deleteDetailPoint={
                                                        deleteDescriptionPoint
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* ========================tech stack======================== */}
                <div className="tableContainer">
                    <h6>Tech Stack</h6>
                    <hr></hr>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tech Stack Name</th>
                                <th scope="col" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Add tech stack name"
                                        className="form-control"
                                        value={techStack}
                                        onChange={(e) =>
                                            setTechStack(e.target.value)
                                        }
                                    />
                                </td>
                                <td colSpan={2}>
                                    <Link
                                        className="btn btn-primary addBtn"
                                        type="button"
                                        onClick={() => {
                                            addTechStack();
                                        }}
                                    >
                                        Add
                                    </Link>
                                </td>
                            </tr>
                            {techStacks ? (
                                <>
                                    {techStacks.map((techStack, index) => {
                                        return (
                                            <TechStackRow
                                                techStack={techStack}
                                                index={index}
                                                saveChanges={updateTechStack}
                                                deleteDetailPoint={
                                                    deleteTechStack
                                                }
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* ========================project links======================== */}
                <div className="tableContainer">
                    <h6>Project Links</h6>
                    <hr></hr>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Project Link Name</th>
                                <th
                                    scope="col"
                                    colSpan={2}
                                    rowSpan={2}
                                    style={{ verticalAlign: "middle" }}
                                >
                                    Actions
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Project Link URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Add project link name"
                                        className="form-control"
                                        value={projectLinkName}
                                        onChange={(e) =>
                                            setProjectLinkName(e.target.value)
                                        }
                                    />
                                </td>
                                <td
                                    colSpan={2}
                                    rowSpan={2}
                                    style={{ verticalAlign: "middle" }}
                                >
                                    <Link
                                        className="btn btn-primary addBtn"
                                        type="button"
                                        onClick={() => {
                                            addProjectLink();
                                        }}
                                    >
                                        Add
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {" "}
                                    <input
                                        placeholder="Add project link URL"
                                        className="form-control"
                                        value={projectLinkUrl}
                                        onChange={(e) =>
                                            setProjectLinkUrl(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            {projectLinks ? (
                                <>
                                    {projectLinks.map((projectLink, index) => {
                                        return (
                                            <ProjectLinkRow
                                                projectLink={projectLink}
                                                index={index}
                                                saveChanges={updateProjectLink}
                                                deleteDetailPoint={
                                                    deleteProjectLink
                                                }
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* ========================component======================== */}
                <div className="tableContainer">
                    <h6>Project Components</h6>
                    <hr></hr>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Project Component Name</th>
                                <th
                                    scope="col"
                                    colSpan={2}
                                    rowSpan={2}
                                    style={{ verticalAlign: "middle" }}
                                >
                                    Actions
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Project Component Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Add project component name"
                                        className="form-control"
                                        value={componentName}
                                        onChange={(e) =>
                                            setComponentName(e.target.value)
                                        }
                                    />
                                </td>
                                <td
                                    colSpan={2}
                                    rowSpan={2}
                                    style={{ verticalAlign: "middle" }}
                                >
                                    <Link
                                        className="btn btn-primary addBtn"
                                        type="button"
                                        onClick={() => {
                                            addProjectComponent();
                                        }}
                                    >
                                        Add
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {" "}
                                    <input
                                        placeholder="Add project component link"
                                        className="form-control"
                                        value={componentLink}
                                        onChange={(e) =>
                                            setComponentLink(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            {projectComponents ? (
                                <>
                                    {projectComponents.map(
                                        (projectComponent, index) => {
                                            return (
                                                <ProjectLinkRow
                                                    projectComponent={
                                                        projectComponent
                                                    }
                                                    index={index}
                                                    saveChanges={
                                                        updateProjectComponent
                                                    }
                                                    deleteDetailPoint={
                                                        deleteProjectComponent
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link
                className="btn btn-primary addBtn"
                onClick={() => {
                    addProject();
                }}
            >
                Add
            </Link>
        </div>
    );
}

export default ProjectForm;
