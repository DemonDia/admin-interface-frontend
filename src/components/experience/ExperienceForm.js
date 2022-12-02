import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailRow from "./DetailRow";
function ExperienceForm(props) {
    const [companyName, setCompanyName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [details, setDetails] = useState([]);
    const [detailPoint, setDetailPoint] = useState("");
    const [startMonth, setStartMonth] = useState(11);
    const [startYear, setStartYear] = useState(2022);
    const [companyURL, setCompanyURL] = useState("");
    const [endMonth, setEndMonth] = useState(11);
    const [endYear, setEndYear] = useState(2022);
    const navigate = useNavigate();

    const monthsDict = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    useEffect(() => {
        // ==========if its to update==========
        if (props.experience) {
            setCompanyName(props.experience.company_name);
            const [startingMonth, startingYear] =
                props.experience.starting.split(" ");
            setStartYear(startingYear);
            setStartMonth(getMonthFromString(startingMonth));

            const [endingMonth, endingYear] =
                props.experience.ending.split(" ");
            setEndYear(endingYear);
            setEndMonth(getMonthFromString(endingMonth));

            setRoleName(props.experience.title);
            setDetails(props.experience.details);
            setCompanyURL(props.experience.website);
        }
    }, []);

    // ========================main functions========================
    // ========== cancel ==========
    const cancelChanges = () => {
        // props.cancel(props.navigate)
        alert("back");
        navigate("/");
    };
    // ========== add ==========
    const addNewExperience = async () => {
        const newExperience = {
            companyname: companyName,
            starting: getMonthName(startMonth) + " " + startYear,
            ending: getMonthName(endMonth) + " " + endYear,
            details: details,
            rolename: roleName,
            comapanysite: companyURL,
        };
        await props.addItem(newExperience);
    };
    // ========== update ==========

    // ========================other functions========================
    const getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
    };

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString("en-US", { month: "long" });
    };

    // ============add detail============
    const addDetailPoint = () => {
        if (details.includes(detailPoint)) {
            alert("It exists");
        } else if (detailPoint == "") {
            alert("Detail cannot be empty");
        } else {
            details.push(detailPoint);
            setDetails(details);
            setDetailPoint("");
        }
    };

    // ============update detail============
    const updateDetailPoint = (currentDetail, index) => {
        details[index] = currentDetail;
    };
    // ============delete detail============
    const deleteDetailPoint = (currentDetail) => {
        const filteredDetails = details.filter((detail) => {
            return detail != currentDetail;
        });
        setDetails(filteredDetails);
    };

    return (
        <div className="card formContainer">
            <div className="row">
                <div className="col-12">
                    <label>Role name:*</label>
                    <input
                        className="form-control"
                        value={roleName}
                        placeholder="Add role name"
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label>Company name:*</label>
                    <input
                        className="form-control"
                        value={companyName}
                        placeholder="Add company name"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label>Company website:</label>
                    <input
                        className="form-control"
                        value={companyURL}
                        placeholder="Add company website"
                        onChange={(e) => setCompanyURL(e.target.value)}
                    />
                </div>

                <div className="col-6 col-sm-12">
                    <label>Start Year:*</label>
                    <input
                        type="number"
                        className="form-control"
                        value={startYear}
                        placeholder="Start Year"
                        onChange={(e) => setStartYear(e.target.value)}
                    />
                </div>
                <div className="col-6 col-sm-12">
                    <label>Start Month:*</label>
                    <select
                        className="form-select"
                        onChange={(e) => setStartMonth(e.target.value)}
                        value={startMonth}
                    >
                        {monthsDict.map((month, number) => {
                            return <option value={number}>{month}</option>;
                        })}
                    </select>
                </div>

                <div className="col-6 col-sm-12">
                    <label>End Year:*</label>
                    <input
                        type="number"
                        className="form-control"
                        value={endYear}
                        placeholder="Start Year"
                        onChange={(e) => setEndYear(e.target.value)}
                    />
                </div>
                <div className="col-6 col-sm-12">
                    <label>End Month:*</label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setEndMonth(e.target.value)}
                        value={endMonth}
                    >
                        {monthsDict.map((month, number) => {
                            return <option value={number}>{month}</option>;
                        })}
                    </select>
                </div>

                <div className="tableContainer">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Detail</th>
                                <th scope="col" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Add Detail"
                                        className="form-control"
                                        value={detailPoint}
                                        onChange={(e) =>
                                            setDetailPoint(e.target.value)
                                        }
                                    />
                                </td>
                                <td colSpan={2}>
                                    <Link
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => {
                                            addDetailPoint();
                                        }}
                                    >
                                        Add
                                    </Link>
                                </td>
                            </tr>
                            {details ? (
                                <>
                                    {details.map((detail, index) => {
                                        return (
                                            <DetailRow
                                                detail={detail}
                                                index={index}
                                                saveChanges={updateDetailPoint}
                                                deleteDetailPoint={
                                                    deleteDetailPoint
                                                }
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
            </div>
            <Link
                className="btn btn-primary"
                onClick={() => {
                    addNewExperience();
                }}
            >
                Add
            </Link>
        </div>
    );
}

export default ExperienceForm;