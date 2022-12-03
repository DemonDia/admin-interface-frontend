import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
function TechStackRow(props) {
    const [editing, isEditing] = useState(false);

    const [currentTechStack, setCurrentTechStack] = useState(
        props.currentTechStack
    );
    const saveChanges = () => {
        props.saveChanges(currentTechStack, props.index);
        isEditing(false);
    };
    return (
        <tr>
            {!editing ? (
                <>
                    <td align="left">{props.techStack}</td>
                    <td>
                        <Link
                            onClick={() => {
                                isEditing(true);
                            }}
                        >
                            <PencilIcon />
                        </Link>
                    </td>
                    <td>
                        <Link
                            onClick={() => {
                                props.deleteRow(props.techStack);
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
                            value={currentTechStack}
                            onChange={(e) => {
                                setCurrentTechStack(e.target.value);
                            }}
                        />
                    </td>
                    <td>
                        <Link
                            onClick={() => {
                                saveChanges();
                            }}
                        >
                            <SaveIcon />
                        </Link>
                    </td>
                    <td>
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
    );
}

export default TechStackRow;
