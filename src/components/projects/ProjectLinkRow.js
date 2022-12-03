import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
function ProjectLinkRow(props) {
    const [editing, isEditing] = useState(false);
    const [projectLinkName, setProjectLinkName] = useState(
        props.projectLink.projectLinkName
    );
    const [projectLinkUrl, setProjectLinkUrl] = useState(
        props.projectLink.projectLinkUrl
    );
    const saveChanges = () => {
        console.log(props.index)
        props.saveChanges(projectLinkName,projectLinkUrl, props.index);
        isEditing(false);
    };
    return (
        <>
            <tr>
                {!editing ? (
                    <>
                        <td align="left">
                            {props.projectLink.projectLinkName}
                        </td>{" "}
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                            <Link
                                onClick={() => {
                                    isEditing(true);
                                }}
                            >
                                <PencilIcon />
                            </Link>
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                            <Link
                                onClick={() => {
                                    props.deleteRow(props.projectLink);
                                }}
                            >
                                <TrashIcon />
                            </Link>
                        </td>
                    </>
                ) : (
                    <>
                        <td>
                            <input
                                className="form-control"
                                value={projectLinkName}
                                onChange={(e) => {
                                    setProjectLinkName(e.target.value);
                                }}
                            />
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                            <Link
                                onClick={() => {
                                    saveChanges();
                                }}
                            >
                                <SaveIcon />
                            </Link>
                        </td>
                        <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                            <Link
                                onClick={() => {
                                    isEditing(false);
                                }}
                            >
                                <CancelIcon />
                            </Link>
                        </td>
                    </>
                )}
            </tr>
            <tr>
                {!editing ? (
                    <>
                        <td align="left">{props.projectLink.projectLinkUrl}</td>
                    </>
                ) : (
                    <>
                        <td>
                            <input
                                className="form-control"
                                value={projectLinkUrl}
                                onChange={(e) => {
                                    setProjectLinkUrl(e.target.value);
                                }}
                            />
                        </td>
                    </>
                )}
            </tr>
        </>
    );
}

export default ProjectLinkRow;
