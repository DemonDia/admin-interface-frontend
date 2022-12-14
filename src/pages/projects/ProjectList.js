import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import { PencilIcon, TrashIcon } from "../../components/general/icons";
import EmptyContentRow from "../../components/general/tables/EmptyContentRow";
import Loader from "../../components/general/Loader";
import { NavbarContext } from "../../context/NavbarContext";
function ProjectList(props) {
    const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [loading, isLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const currentToken = localStorage.getItem("loginToken");
    const [userId, setUserId] = useState("");

    // search as you type
    const [search, setSearch] = useState("");

    // filter year
    const [filterYear, setFilterYear] = useState(0);
    const [availableYears, setAvailableYears] = useState([]);

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const deleteProject = async (projectId) => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API +
                    `/api/projects/${projectId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    data: {
                        userId,
                    },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    getProjects(userId);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };

    const getProjects = async (userId) => {
        axios
            .get(
                process.env.REACT_APP_BACKEND_API + `/api/projects/${userId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    var fetchedProjects = res.data.data.sort(function (a, b) {
                        return a.year - b.year;
                    });
                    var allAvailableYears = [];
                    fetchedProjects.map((project) => {
                        if (!allAvailableYears.includes(project.year)) {
                            allAvailableYears.push(project.year);
                        }
                    });
                    setAvailableYears(allAvailableYears);
                    setProjects(fetchedProjects);
                    isLoading(false);
                }
            })
            .catch((err) => {});
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setLoggedIn(true)
                await getProjects(result.data.id);
                
            }
        });
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="page">
            <h1>Projects</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Projects
                    </li>
                </ol>
            </nav>
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
                            className="form-select"
                            onChange={(e) => {
                                setFilterYear(e.target.value);
                            }}
                        >
                            <option selected value="0">
                                Select Year
                            </option>

                            {availableYears ? (
                                availableYears.reverse().map((year) => {
                                    return <option value={year}>{year}</option>;
                                })
                            ) : (
                                <></>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3" style={{ padding: "10px" }}>
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
                    <div className="col">
                        <Link
                            type="button"
                            className="btn btn-primary createBtn"
                            to="/projects/add"
                        >
                            New Project
                        </Link>
                    </div>
                </div>
            </div>
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <div className="tableContainer card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Project Name</th>
                                <th scope="col">Project Year</th>
                                <th scope="col" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length > 0 ? (
                                <>
                                    {projects
                                        .filter(
                                            (project) =>
                                                (filterYear > 0
                                                    ? project.year == filterYear
                                                    : project) &&
                                                project.projectName
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )
                                        )
                                        .sort((a, b) =>
                                            sortBy == 1
                                                ? a.projectName > b.projectName
                                                    ? 1
                                                    : -1
                                                : sortBy == 2
                                                ? b.projectName > a.projectName
                                                    ? 1
                                                    : -1
                                                : -1
                                        )

                                        .map((project) => {
                                            return (
                                                <tr key={project._id}>
                                                    <td align="left">
                                                        {project.projectName}
                                                    </td>
                                                    <td align="left">
                                                        {project.year}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/projects/${project._id}`}
                                                        >
                                                            <PencilIcon />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            onClick={() => {
                                                                deleteProject(
                                                                    project._id
                                                                );
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
                                <>
                                    <EmptyContentRow
                                        colSpan={4}
                                        item={"Projects"}
                                    />
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProjectList;
