import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ComponentRow from "./ComponentRow";
import DescriptionRow from "./DescriptionRow";
import ProjectLinkRow from "./ProjectLinkRow";
import TechStackRow from "./TechStackRow";
function ProjectForm(props) {
    const [projectName, setProjectName] = useState("");
    const [projectYear, setProjectYear] = useState(2022);
    useEffect(() => {
        if (props.project) {
            setProjectName(props.project.projectName);
            setProjectYear(props.project.year);
            setDescription(props.project.description);
            setTechStacks(props.project.techStacks);
            setProjectLinks(props.project.links);
            setProjectComponents(props.project.components);
        }
    }, []);
    // ========================main functions========================
    // ========== add ==========
    const addProject = async () => {
        const newProject = {
            projectName: projectName,
            year: projectYear,
            description,
            techStacks: techStacks,
            links: projectLinks,
            components: projectComponents,
        };
        await props.addItem(newProject);
    };
    // ========== update ==========
    const updateProject = async () => {
        const currentProject = {
            id: props.project._id,
            projectName: projectName,
            year: projectYear,
            description,
            techStacks: techStacks,
            links: projectLinks,
            components: projectComponents,
        };
        await props.updateItem(currentProject);
    };

    // =======================descriptions=======================
    const [description, setDescription] = useState([]);
    const [descriptionPoint, setDescriptionPoint] = useState("");
    // ========== add ==========
    const addDescriptionPoint = () => {
        if (description.includes(descriptionPoint)) {
            alert("It exists");
        } else if (descriptionPoint == "") {
            alert("Description point cannot be empty");
        } else if (descriptionPoint.length > 100) {
            alert("Description cannot exceed 100 characters");
        } else {
            description.push(descriptionPoint);
            setDescription(description);
            setDescriptionPoint("");
        }
    };
    // ========== update ==========
    const updateDescriptionPoint = (descriptionPoint, index) => {
        description[index] = descriptionPoint;
    };
    // ========== delete ==========
    const deleteDescriptionPoint = (descriptionPoint) => {
        const filteredDescriptionPoints = description.filter(
            (currentDescriptionPoint) => {
                return currentDescriptionPoint != descriptionPoint;
            }
        );
        setDescription(filteredDescriptionPoints);
    };

    // =======================tech stacks=======================
    const [techStacks, setTechStacks] = useState([]);
    const [techStack, setTechStack] = useState("");
    // ========== add ==========
    const addTechStack = () => {
        if (techStacks.includes(techStack)) {
            alert("It exists");
        } else if (techStack == "") {
            alert("Tech stack name cannot be empty");
        } else {
            techStacks.push(techStack);
            setTechStacks(techStacks);
            setTechStack("");
        }
    };
    // ========== update ==========
    const updateTechStack = (currentTechStack, index) => {
        techStacks[index] = currentTechStack;
    };
    // ========== delete ==========
    const deleteTechStack = (currentTechStack) => {
        const filteredTechStacks = techStacks.filter((techStack) => {
            return techStack != currentTechStack;
        });
        setTechStacks(filteredTechStacks);
    };

    // =======================project links=======================
    const [projectLinks, setProjectLinks] = useState([]);
    const [projectLinkName, setProjectLinkName] = useState("");
    const [projectLinkUrl, setProjectLinkUrl] = useState("");
    // ========== add ==========
    const addProjectLink = () => {
        if (projectLinkName == "" || projectLinkUrl == "") {
            alert("Link name and URL cannot be empty");
        } else {
            projectLinks.push({
                projectLinkName,
                projectLinkUrl,
            });
            setProjectLinks(projectLinks);
            setProjectLinkName("");
            setProjectLinkUrl("");
        }
    };
    // ========== update ==========
    const updateProjectLink = (projectLinkName, projectLinkURL, index) => {
        if (projectLinkName != "" && projectLinkURL != "") {
            projectLinks[index].projectLinkName = projectLinkName;
            projectLinks[index].projectLinkUrl = projectLinkURL;
        }
    };
    // ========== delete ==========
    const deleteProjectLink = (currProjectLink) => {
        const newProjectLinks = projectLinks.filter((projectLink) => {
            return !(
                projectLink.projectLinkName ==
                    currProjectLink.projectLinkName &&
                projectLink.projectLinkUrl == currProjectLink.projectLinkUrl
            );
        });
        setProjectLinks(newProjectLinks);
    };

    // =======================components=======================
    const [projectComponents, setProjectComponents] = useState([]);
    const [componentName, setComponentName] = useState("");
    const [componentLink, setComponentLink] = useState("");
    // ========== add ==========
    const addProjectComponent = () => {
        if (componentName == "" || componentLink == "") {
            alert("Component name and link cannot be empty");
        } else {
            projectComponents.push({
                componentName,
                componentLink,
            });
            setProjectComponents(projectComponents);
            setComponentName("");
            setComponentLink("");
        }
    };
    // ========== update ==========
    const updateProjectComponent = (componentName, componentLink, index) => {
        if (componentName != "" && componentLink != "") {
            projectComponents[index].componentName = componentName;
            projectComponents[index].componentLink = componentLink;
        }
    };
    // ========== delete ==========
    const deleteProjectComponent = (currProjectComponent) => {
        const newProjectComponents = projectComponents.filter(
            (projectComponent) => {
                return !(
                    projectComponent.componentName ==
                        currProjectComponent.componentName &&
                    projectComponent.componentLink ==
                        currProjectComponent.componentLink
                );
            }
        );
        setProjectComponents(newProjectComponents);
    };

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
                                        placeholder="Add a short description (No more than 100 characters)"
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
                                                    descriptionPoint={
                                                        descriptionPoint
                                                    }
                                                    index={index}
                                                    key={index}
                                                    saveChanges={
                                                        updateDescriptionPoint
                                                    }
                                                    deleteRow={
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
                                                key={index}
                                                saveChanges={updateTechStack}
                                                deleteRow={deleteTechStack}
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
                                                key={index}
                                                saveChanges={updateProjectLink}
                                                deleteRow={deleteProjectLink}
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
                                                <ComponentRow
                                                    projectComponent={
                                                        projectComponent
                                                    }
                                                    key={index}
                                                    index={index}
                                                    saveChanges={
                                                        updateProjectComponent
                                                    }
                                                    deleteRow={
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
            {!props.project ? (
                <Link
                    className="btn btn-primary addBtn"
                    onClick={() => {
                        addProject();
                    }}
                >
                    Add
                </Link>
            ) : (
                <Link
                    className="btn btn-primary addBtn"
                    onClick={() => {
                        updateProject();
                    }}
                >
                    Save
                </Link>
            )}
        </div>
    );
}

export default ProjectForm;
