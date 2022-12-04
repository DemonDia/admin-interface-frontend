import React, { useState, useEffect } from "react";
import ProjectForm from "../../components/projects/ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
function AddProject(props) {
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("loginToken");
    const [userId,setUserId] = useState("")

    const addUserProject = async (project) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/api/projects/add",
                {
                    ...project,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/projects");
                } else {
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate, axios).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
            }
        });
    };

    useEffect(() => {
        loadPage()
    }, []);
    return (
        <div>
            <h1>Add Project</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to="/projects">Project (cancel)</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add new project
                    </li>
                </ol>
            </nav>
            <ProjectForm addItem={addUserProject} project={null} />
        </div>
    );
}

export default AddProject;
