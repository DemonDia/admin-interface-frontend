import React, { useState, useEffect } from "react";
import ExperienceForm from "../../components/experience/ExperienceForm";
import { Link, useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
function AddExperience(props) {
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    const addUserExperience = async (experience) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/api/experience/add",
                {
                    ...experience,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/experience");
                } else {
                    console.log(res.data.message)
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to add");
            });
    };

    useEffect(() => {
        defaultAuthCheck(navigate, axios);
    }, []);
    return (
        <div>
            <h1>Add Experience</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to="/experience">Experience (cancel)</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add new experience
                    </li>
                </ol>
            </nav>
            <ExperienceForm
                addItem={addUserExperience}
                experience={null}
            />
        </div>
    );
}

export default AddExperience;
