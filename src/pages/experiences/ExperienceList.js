import React, { useEffect, ueState, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import ExperienceForm from "../../components/experience/ExperienceForm";
import { PencilIcon, TrashIcon } from "../../components/general/icons";
function ExperienceList(props) {
    const navigate = useNavigate();
    const [loading, isLoading] = useState(true);
    const [experiences, setExperience] = useState([]);
    const currentToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    // search as you type
    const [search, setSearch] = useState("");

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const getExperiences = async () => {
        axios
            .get(
                process.env.REACT_APP_BACKEND_API + `/api/experience/${userId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setExperience(res.data.data);
                    isLoading(false);
                }
            })
            .catch((err) => {});
    };

    const deleteExperience = async(experienceId)=>{
        await axios
        .delete(
            process.env.REACT_APP_BACKEND_API +
                `/api/experience/${experienceId}`,
            {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId: localStorage.getItem("userId"),
                },
            }
        )
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                alert("Successfully deleted");
                getExperiences()
            } else {
                console.log(res);
                alert("Failed to delete");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Failed to delete");
        });
    }

    useEffect(() => {
        defaultAuthCheck(navigate, axios);
        getExperiences();
    }, []);
    return (
        <div>
            <div className="page">
                <h1>Experience List</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Home</Link>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            Experiences
                        </li>
                    </ol>

                    <div className="card containers">
                        <div className="row">
                            <div
                                className="col-md-4"
                                style={{ padding: "10px" }}
                            >
                                <input
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name"
                                />
                            </div>
                            <div
                                className="col-md-3"
                                style={{ padding: "10px" }}
                            >
                                <select
                                    className="form-select"
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
                                <Link
                                    type="button"
                                    className="btn btn-primary createBtn"
                                    to="/experience/add"
                                >
                                    Add New Experience
                                </Link>
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
                                        <th scope="col">Role Name</th>
                                        <th scope="col">Company Name</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col" colSpan={2}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiences ? (
                                        <>
                                            {experiences
                                                .filter((experience) =>
                                                    experience.rolename
                                                        .toLowerCase()
                                                        .includes(
                                                            search.toLowerCase()
                                                        )
                                                )
                                                .sort((a, b) =>
                                                    sortBy == 1
                                                        ? a.rolename >
                                                          b.rolename
                                                            ? 1
                                                            : -1
                                                        : sortBy == 2
                                                        ? b.rolename >
                                                          a.rolename
                                                            ? 1
                                                            : -1
                                                        : -1
                                                )

                                                .map((experience) => {
                                                    return (
                                                        <tr
                                                            key={experience._id}
                                                        >
                                                            <td>
                                                                {
                                                                    experience.rolename
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    experience.companyname
                                                                }
                                                            </td>
                                                            <td>
                                                                {experience.starting}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={
                                                                        "/experience/" +
                                                                        experience._id
                                                                    }
                                                                >
                                                                    <PencilIcon />
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    onClick={() => {
                                                                        deleteExperience(experience._id);
                                                                    }}
                                                                >
                                                                    <TrashIcon />
                                                                </Link>
                                                            </td>
                                                        </tr>
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
        </div>
    );
}

export default ExperienceList;