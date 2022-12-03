import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
import axios from "axios";
function SkillRow(props) {
    const [editing, setEditing] = useState(false);
    const [skillName, setSkillName] = useState(props.skill.skillName);
    const [year, setYear] = useState(props.skill.year);
    const currentToken = localStorage.getItem("loginToken");

    // =============save=============
    const saveSkill = async () => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + "/api/skills/",
                {
                    id: props.skill._id,
                    name: skillName,
                    year,
                    userId:localStorage.getItem("userId")
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully saved");
                    props.refreshData();
                    setEditing(false);
                } else {
                    alert("Failed to save");
                }
            })
            .catch((err) => {
                alert("Failed to save");
            });
    };

    // =============delete=============
    const deleteSkill = async () => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API +
                    `/api/skills/${props.skill._id}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    data: {
                        userId: localStorage.getItem("userId"),
                    },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    props.refreshData();
                    setEditing(false);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };
    const cancel = () => {
        setEditing(false);
        setSkillName(props.skill.skillName);
        setYear(props.skill.year);
    };
    return (
        <>
            {!editing ? (
                <>
                    <tr>
                        <td align="left">{skillName}</td>
                        <td align="left">{year}</td>
                        <td>
                            <Link
                                onClick={() => {
                                    setEditing(true);
                                }}
                            >
                                <PencilIcon />
                            </Link>
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    deleteSkill();
                                }}
                            >
                                <TrashIcon />
                            </Link>
                        </td>
                    </tr>
                </>
            ) : (
                <>
                    <tr>
                        <td>
                            <input
                                value={skillName}
                                onChange={(e) => {
                                    setSkillName(e.target.value);
                                }}
                                className="form-control"
                            />{" "}
                        </td>
                        <td>
                            {" "}
                            <input
                                value={year}
                                type="number"
                                onChange={(e) => {
                                    setYear(e.target.value);
                                }}
                                className="form-control"
                            />{" "}
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    cancel();
                                }}
                            >
                                <CancelIcon />
                            </Link>
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    saveSkill();
                                }}
                            >
                                <SaveIcon />
                            </Link>
                        </td>
                    </tr>
                </>
            )}
        </>
    );
}

export default SkillRow;
