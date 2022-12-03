import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
function DescriptionRow(props) {
    const [editing, isEditing] = useState(false);

    const [descriptionPoint, setDescriptionPoint] = useState(props.descriptionPoint);
    const saveChanges = () => {
        props.saveChanges(descriptionPoint, props.index);
        isEditing(false);
    };
    return (
        <tr>
            {!editing ? (
                <>
                    <td align="left">{props.descriptionPoint}</td>
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
                                props.deleteRow(props.descriptionPoint);
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
                            value={descriptionPoint}
                            onChange={(e) => {
                                setDescriptionPoint(e.target.value);
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

export default DescriptionRow;
