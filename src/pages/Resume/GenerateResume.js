import React, { useState, useEffect, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavbarContext } from "../../context/NavbarContext";
function GenerateResume(props) {
    const serverLink = process.env.REACT_APP_BACKEND_API;
    const { setLoggedIn, loggedIn } = useContext(NavbarContext);
    const [username, setUserName] = useState("");
    const [email, setEmaail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [skills, setSkills] = useState([]);
    const getSkills = async (userId) => {
        await axios.get(serverLink + "/api/skills/" + userId).then((res) => {
            if (res.data.success) {
                if (skills.length == 0) {
                    var skillNames = [];
                    res.data.data.map((skill) => {
                        skillNames.push(skill.skillName);
                    });
                    setSkills(skillNames);
                }
            }
        });
    };
    const [projects, setProjects] = useState([]);
    const getProjects = async (userId) => {
        await axios.get(serverLink + "/api/projects/" + userId).then((res) => {
            if (res.data) {
                var projectList = [];
                res.data.data.map((project) => {
                    const { projectName, description, year } = project;
                    projectList.push({ projectName, description, year });
                });
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
                    var experienceList = [];
                    res.data.data.map((experience) => {
                        const {
                            roleName,
                            companyName,
                            starting,
                            ending,
                            details,
                        } = experience;
                        console.log({
                            roleName,
                            companyName,
                            starting,
                            ending,
                            details,
                        });
                        experienceList.push({
                            roleName,
                            companyName,
                            starting,
                            ending,
                            details,
                        });
                    });
                    setExperiences(experienceList);
                }
            });
    };

    useEffect(() => {
        const loadPage = async () => {
            await defaultAuthCheck(navigate).then(async (result) => {
                if (result.data.success) {
                    setLoggedIn(true);
                    const userId = result.data.id;
                    setEmaail(result.data.email);
                    setPhoneNumber(result.data.phoneNumber);
                    setUserName(result.data.username);
                    await getSkills(userId);
                    await getProjects(userId);
                    await getExperiences(userId);
                    setLoading(false);
                }
            });
        };
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
            <div className="card resumeContainer">
                <h2>Preview Resume Content</h2>
                <div className="card resumeContentContainer">
                    <h3>{username}</h3>
                    {email} | {phoneNumber}
                </div>

                <div className="card resumeContentContainer">
                    <h4>Skills</h4>
                    {loading ? (
                        <>
                            <h3>Loading...</h3>
                        </>
                    ) : (
                        <ul>
                            {skills.map((skill, index) => {
                                return (
                                    <li className="itemPoint" key={index}>
                                        {skill}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <div className="card resumeContentContainer">
                    <h4>Projects</h4>
                    {loading ? (
                        <>
                            <h3>Loading...</h3>
                        </>
                    ) : (
                        <>
                            {projects.map((project, index) => {
                                return (
                                    <div className="itemPoint" key={index}>
                                        <h6>
                                            {project.projectName} (
                                            {project.year})
                                        </h6>
                                        <ul>
                                            {project.description.map(
                                                (descriptionPoint, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {descriptionPoint}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div className="card resumeContentContainer">
                    <h4>Experiences</h4>
                    {loading ? (
                        <>
                            <h3>Loading...</h3>
                        </>
                    ) : (
                        <>
                            {experiences.map((experience, index) => {
                                return (
                                    <div className="itemPoint" key={index}>
                                        <h6>
                                            {experience.companyName} -{" "}
                                            <i>
                                                {experience.roleName} (
                                                {experience.starting} -{" "}
                                                {experience.ending})
                                            </i>
                                        </h6>
                                        <ul>
                                            {experience.details.map(
                                                (detailPoint, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {detailPoint}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GenerateResume;
