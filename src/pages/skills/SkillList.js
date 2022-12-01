import React, { useEffect, ueState, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import SkillRow from "../../components/skills/SkillRow";
import CreateSkill from "../../components/skills/CreateSkill";
function SkillList(props) {
    const navigate = useNavigate()
    const [loading, isLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const currentToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    const getSkills = async () => {
        axios
            .get(process.env.REACT_APP_BACKEND_API + `/api/skills/${userId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data);
                    setSkills(res.data.data);
                    isLoading(false);
                }
            })
            .catch((err) => {});
    };
    useEffect(() => {
        defaultAuthCheck(navigate,axios);
        getSkills();
    }, []);
    return (
        <div className="page">
            <h1>Skills</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Skills
                    </li>
                </ol>
                <CreateSkill refreshData={getSkills}/>
                {loading ? (
                    <></>
                ) : (
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Skill Name</th>
                                    <th scope="col">Skill Year</th>
                                    <th scope="col" colSpan={2}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills ? (
                                    <>
                                        {skills.map((skill) => {
                                            return (
                                                <SkillRow
                                                    skill={skill}
                                                    refreshData={getSkills}
                                                    key={skill._id}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default SkillList;
