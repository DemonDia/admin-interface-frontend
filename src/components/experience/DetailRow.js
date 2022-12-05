import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
function DetailRow(props) {
    const [editing, isEditing] = useState(false);

    const [detailPoint, setDetailPoint] = useState(props.detail);
    const saveChanges = () => {
        if(detailPoint.length > 100){
            alert("Detail cannot exceed 100 characters")
        }
        else{
            props.saveChanges(detailPoint, props.index);
            isEditing(false);
        }
    };
    return (
        <tr>
            {!editing ? (
                <>
                    <td align="left">{props.detail}</td>
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
                                props.deleteDetailPoint(props.detail);
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
                            value={detailPoint}
                            onChange={(e) => {
                                setDetailPoint(e.target.value);
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

export default DetailRow;
