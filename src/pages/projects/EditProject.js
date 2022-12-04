import React, { useState, useEffect } from "react";
import ProjectForm from "../../components/projects/ProjectForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import Loader from "../../components/general/Loader";
function EditProject(props) {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("loginToken");
    const [userId, setUserId] = useState("");
    const [project, setProject] = useState(null);
    const editUserProject = async (project) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + "/api/projects/",
                {
                    ...project,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully saved");
                    navigate("/projects");
                } else {
                    console.log(res.data.message);
                    alert("Failed to save");
                }
            })
            .catch((err) => {
                alert("Failed to save");
            });
    };
    const getCurrentProject = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API +
                    `/api/projects/one/${projectId}`,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    setProject(res.data.data);
                }
            })
            .catch((err) => {});
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate, axios).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                await getCurrentProject();
            }
        });
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <h1>Edit Project</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to="/projects">Projects (cancel)</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit project
                    </li>
                </ol>
            </nav>
            {project ? (
                <ProjectForm project={project} updateItem={editUserProject} />
            ) : (
                <>
                    <Loader />
                </>
            )}
        </div>
    );
}

export default EditProject;
