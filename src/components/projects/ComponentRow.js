import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
function ComponentRow(props) {
    const [editing, isEditing] = useState(false);
    const [componentName, setComponentName] = useState(
        props.projectComponent.componentName
    );
    const [componentLink, setComponentLink] = useState(
        props.projectComponent.componentLink
    );
    const saveChanges = () => {
        props.saveChanges(componentName, componentLink, props.index);
        isEditing(false);
    };
    return (
        <>
            <tr>
                {!editing ? (
                    <>
                        <td align="left">
                            {props.projectComponent.componentName}
                        </td>
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
                                    props.deleteRow(props.projectComponent);
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
                                value={componentName}
                                onChange={(e) => {
                                    setComponentName(e.target.value);
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
                        <td align="left">{props.projectComponent.componentLink}</td>
                    </>
                ) : (
                    <>
                        <td>
                            <input
                                className="form-control"
                                value={componentLink}
                                onChange={(e) => {
                                    setComponentLink(e.target.value);
                                }}
                            />
                        </td>
                    </>
                )}
            </tr>
        </>
    );
}

export default ComponentRow;
