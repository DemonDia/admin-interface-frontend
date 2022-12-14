import React, { useState, useEffect,useContext } from "react";
import ExperienceForm from "../../components/experience/ExperienceForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import Loader from "../../components/general/Loader";
import { NavbarContext } from "../../context/NavbarContext";
function EditExperience(props) {
    const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const { experienceId } = useParams();
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("loginToken");
    const [userId, setUserId] = useState();
    const [experience, setExperience] = useState(null);
    const editUserExperience = async (experience) => {
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
                alert("Failed to save");
            });
    };
    const getCurrentExperience = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API +
                    `/api/experience/one/${experienceId}`,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    setExperience(res.data.data);
                }
            })
            .catch((err) => {});
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setLoggedIn(true)
                await getCurrentExperience();
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <h1>Edit Experience</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to="/experience">Experience (cancel)</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit experience
                    </li>
                </ol>
            </nav>
            {experience ? (
                <ExperienceForm
                    experience={experience}
                    updateItem={editUserExperience}
                />
            ) : (
                <>
                    <Loader />
                </>
            )}
        </div>
    );
}

export default EditExperience;
