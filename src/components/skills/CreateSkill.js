import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateSkill(props) {
    const [skillName, setSkillName] = useState("");
    const [year, setYear] = useState(2022);
    const currentToken = localStorage.getItem("loginToken");
    const addSkill = async () => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/api/skills/add",
                {
                    skillname: skillName,
                    year,
                    userId: localStorage.getItem("userId"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                }

                // {  Authorization: `Bearer ${currentToken}` }
            )
            .then((res) => {
                if (res.data.success) {
                    props.refreshData();
                    alert("Skill added!");
                    setSkillName("");
                    setYear(2022);
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to add");
            });
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-primary createBtn"
                data-bs-toggle="modal"
                data-bs-target="#createSkillModal"
            >
                Create
            </button>
            <div
                className="modal fade"
                id="createSkillModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Create Skill
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <label>Skill Name:</label>
                            <input
                                placeholder="Add skill name"
                                value={skillName}
                                onChange={(e) => {
                                    setSkillName(e.target.value);
                                }}
                                className="form-control"
                            />
                            <label>Skill Year:</label>
                            <input
                                type="number"
                                placeholder="Add skill year"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value);
                                }}
                                className="form-control"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={async () => {
                                    await addSkill();
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateSkill;
