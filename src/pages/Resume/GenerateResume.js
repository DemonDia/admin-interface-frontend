import React, { useState, useEffect, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavbarContext } from "../../context/NavbarContext";
function GenerateResume(props) {
    const serverLink = process.env.REACT_APP_BACKEND_API;
    const { setLoggedIn, loggedIn } = useContext(NavbarContext);
    const [email, setEmaail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const resumeContent = {
        "Skills":[],
        "Projects":[],
        "Experiences":[]
    }



    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setLoggedIn(true);
                const userId = result.data.id;
                setEmaail(result.data.email);
                setPhoneNumber(result.data.phoneNumber);
                await getSkills(userId);
                await getProjects(userId);
                await getExperiences(userId);
            }
        });
    };
    const [skills, setSkills] = useState([]);
    const getSkills = async (userId) => {
        await axios.get(serverLink + "/api/skills/" + userId).then((res) => {
            if (res.data.success) {
                setSkills(res.data.data);
            }
        });
    };
    const [projects, setProjects] = useState([]);
    const getProjects = async (userId) => {
        await axios.get(serverLink + "/api/projects/" + userId).then((res) => {
            if (res.data) {
                setProjects(res.data.data);
            }
        });
    };
    const [experiences, setExperiences] = useState([]);
    const getExperiences = async (userId) => {
        await axios
            .get(serverLink + "/api/experience/" + userId)
            .then((res) => {
                if (res.data.success) {
                    setExperiences(res.data.data);
                }
            });
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="page">
            <h1>Generate Resume</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Resume
                    </li>
                </ol>
            </nav>
            <div className ="card resumeContainer">
                <h3>Preview</h3>
                <div className ="card resumeContentContainer">
                    <h5>Content</h5>
                </div>

            </div>
        </div>
    );
}

export default GenerateResume;
