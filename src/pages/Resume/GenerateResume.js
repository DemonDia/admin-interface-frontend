import React, { useState, useEffect, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavbarContext } from "../../context/NavbarContext";
import Loader from "../../components/general/Loader";
import jsPDF from "jspdf";
function GenerateResume(props) {
    const serverLink = process.env.REACT_APP_BACKEND_API;
    const { setLoggedIn, loggedIn } = useContext(NavbarContext);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
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
                // sort by year
                var projectList = [];
                res.data.data.map((project) => {
                    const { projectName, description, year } = project;
                    projectList.push({ projectName, description, year });
                });
                projectList.sort((a, b) => {
                    return b.year.localeCompare(a.year);
                });
                setProjects(projectList);
            }
        });
    };

    const [experiences, setExperiences] = useState([]);
    const getExperiences = async (userId) => {
        await axios
            .get(serverLink + "/api/experience/" + userId)
            .then((res) => {
                if (res.data.success) {
                    var experienceList = sortExperiences(res.data.data)
                    setExperiences(experienceList);
                }
            });
    };
    // sort experience
    const sortExperiences = (experienceList) => {
        const monthsDict = {
            January: 0,
            Feburary: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };
        const experiencesByYear = {};
        // get by year and the get by month
        experienceList.map((experience) => {
            const [startMonth, startYear] = experience.starting.split(" ");
            if (!(startYear in experiencesByYear)) {
                experiencesByYear[startYear] = [];
            }
            var currentProjectYear = experiencesByYear[startYear];
            currentProjectYear[monthsDict[startMonth]] = experience;
        });
        var reversedExperienceList = [];
        const reversedYears = Object.keys(experiencesByYear).reverse();
        reversedYears.map((year) => {
            const reversedMonths = Object.keys(
                experiencesByYear[year]
            ).reverse();
            reversedMonths.map((month) => {
                reversedExperienceList.push(experiencesByYear[year][month]);
            });
        });
        return reversedExperienceList;
    };

    // ==========================helper function==========================
    const generateResume = () => {
        var doc = jsPDF("portrait", "mm", "a4", "false");
        var pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        var currentVerticalPos = 10;
        var currentHorizontalPos = 5;
        doc.setFontSize(17);
        doc.text(username, pageWidth / 2, currentVerticalPos, {
            align: "center",
        });
        const contacts = email + " | " + phoneNumber;

        currentVerticalPos += 5;
        doc.setFontSize(12);
        doc.text(contacts, pageWidth / 2, currentVerticalPos, {
            align: "center",
        });
        // ===========================skills===========================

        // ========title=======
        currentVerticalPos += 15;
        doc.setFontSize(17);
        doc.text("Skills", currentHorizontalPos, currentVerticalPos, {
            align: "left",
        });
        //  =======content=======
        doc.setFontSize(12);
        currentVerticalPos += 2;
        skills.map((skill) => {
            currentVerticalPos += 5;
            doc.text(`- ${skill}`, currentHorizontalPos, currentVerticalPos);
        });
        // ===========================Projects===========================
        // ========title=======
        currentVerticalPos += 10;
        doc.setFontSize(17);
        doc.text("Projects", currentHorizontalPos, currentVerticalPos, {
            align: "left",
        });
        //  =======content=======
        currentVerticalPos += 2;
        projects.map((project) => {
            // project title
            currentVerticalPos += 5;
            doc.setFontSize(13);
            doc.text(
                `${project.projectName} (${project.year})`,
                currentHorizontalPos,
                currentVerticalPos
            );
            // project description
            doc.setFontSize(12);
            project.description.map((desc) => {
                currentVerticalPos += 5;
                doc.text(
                    `- ${desc}`,
                    currentHorizontalPos + 2,
                    currentVerticalPos
                );
            });
        });
        // ===========================Projects===========================
        // ========title=======
        currentVerticalPos += 10;
        doc.setFontSize(17);
        doc.text("Experiences", currentHorizontalPos, currentVerticalPos, {
            align: "left",
        });
        //  =======content=======
        currentVerticalPos += 2;
        experiences.map((experience) => {
            // project title
            currentVerticalPos += 5;
            doc.setFontSize(13);
            doc.text(
                `${experience.companyName} - ${experience.roleName} (${experience.starting} - ${experience.ending})`,
                currentHorizontalPos,
                currentVerticalPos
            );
            // project description
            doc.setFontSize(12);
            experience.details.map((detailPoint) => {
                currentVerticalPos += 5;
                doc.text(
                    `- ${detailPoint}`,
                    currentHorizontalPos + 2,
                    currentVerticalPos
                );
            });
        });
        doc.save("resume.pdf");
    };

    useEffect(() => {
        const loadPage = async () => {
            await defaultAuthCheck(navigate).then(async (result) => {
                if (result.data.success) {
                    setLoggedIn(true);
                    const userId = result.data.id;
                    setEmail(result.data.email);
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
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link
                            onClick={() => {
                                generateResume();
                            }}
                        >
                            Download Resume (Click to download)
                        </Link>
                    </li>
                </ol>
            </nav>
            <h2> Resume Preview</h2>
            <div className="card resumeContainer">
                <div id="resume">
                    <div className="card resumeContentContainer">
                        {loading ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            <>
                                <h3>{username}</h3>
                                {email} | {phoneNumber}
                            </>
                        )}
                    </div>

                    <div className="card resumeContentContainer">
                        <h4>Skills</h4>
                        {loading ? (
                            <>
                                <Loader />
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
                                <Loader />
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
                                                    (
                                                        descriptionPoint,
                                                        index
                                                    ) => {
                                                        return (
                                                            <li key={index}>
                                                                {
                                                                    descriptionPoint
                                                                }
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
                                <Loader />
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
        </div>
    );
}

export default GenerateResume;
