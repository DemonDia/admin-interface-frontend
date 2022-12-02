import React, { useEffect, ueState, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import SkillRow from "../../components/skills/SkillRow";
import CreateSkill from "../../components/skills/CreateSkill";
function SkillList(props) {
    const navigate = useNavigate();
    const [loading, isLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const currentToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    // search as you type
    const [search, setSearch] = useState("");

    // filter year
    const [filterYear, setFilterYear] = useState(0);
    const [availableYears, setAvailableYears] = useState([]);

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const getSkills = async () => {
        axios
            .get(process.env.REACT_APP_BACKEND_API + `/api/skills/${userId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            })
            .then((res) => {
                if (res.data.success) {
                    var fetchedSkills = res.data.data.sort(function (a, b) {
                        return a.year - b.year;
                    });
                    var allAvailableYears = [];
                    fetchedSkills.map((skill) => {
                        if (!allAvailableYears.includes(skill.year)) {
                            allAvailableYears.push(skill.year);
                        }
                    });
                    setAvailableYears(allAvailableYears);
                    console.log(res.data.data);
                    setSkills(fetchedSkills);
                    isLoading(false);
                }
            })
            .catch((err) => {});
    };

    useEffect(() => {
        defaultAuthCheck(navigate, axios);
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
                
                <div className="card containers">
                    <div className="row">
                        <div className="col-md-4" style={{ padding: "10px" }}>
                            <input
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Search by name"
                            />
                        </div>
                        <div className="col-md-3" style={{ padding: "10px" }}>
                            <select
                                class="form-select"
                                onChange={(e) => {
                                    setFilterYear(e.target.value);
                                }}
                            >
                                <option selected value="0">
                                    Select Year
                                </option>

                                {availableYears ? (
                                    availableYears.reverse().map((year) => {
                                        return (
                                            <option value={year}>{year}</option>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </select>
                        </div>
                        <div className="col-md-3" style={{ padding: "10px" }}>
                            <select
                                class="form-select"
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                }}
                            >
                                <option selected value="0">
                                    Sort by
                                </option>
                                <option value="1">A-Z</option>
                                <option value="2">Z-A</option>
                            </select>
                        </div>
                        <div className="col" style={{ padding: "10px" }}>
                        <CreateSkill refreshData={getSkills} />
                        </div>
                    </div>
                </div>
                {loading ? (
                    <></>
                ) : (
                    <div className="tableContainer card">
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
                                        {skills
                                            .filter(
                                                (skill) =>
                                                    (filterYear > 0
                                                        ? skill.year ==
                                                          filterYear
                                                        : skill) &&
                                                    skill.skillname
                                                        .toLowerCase()
                                                        .includes(
                                                            search.toLowerCase()
                                                        )
                                            )
                                            .sort((a, b) =>
                                                sortBy == 1
                                                    ? a.skillname > b.skillname
                                                        ? 1
                                                        : -1
                                                    : sortBy == 2
                                                    ? b.skillname > a.skillname
                                                        ? 1
                                                        : -1
                                                    : -1
                                            )

                                            .map((skill) => {
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
