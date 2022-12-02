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
            .put(
                process.env.REACT_APP_BACKEND_API + "/api/experience/",
                {
                    ...experience,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully saved");
                    navigate("/experience");
                } else {
                    alert("Failed to save");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to save");
            });
    };

    const cancel = () => {
        navigate("/experience");
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
                        <Link to="/experience">Experiences</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add new experience
                    </li>
                </ol>
            </nav>
            <ExperienceForm addItem={addUserExperience} cancel={cancel} />
        </div>
    );
}

export default AddExperience;
