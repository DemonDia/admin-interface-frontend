import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import ContactRow from "../../components/contacts/ContactRow";
import Loader from "../../components/general/Loader";
import EmptyContentRow from "../../components/general/tables/EmptyContentRow";
import { NavbarContext } from "../../context/NavbarContext";
function ContactList(props) {
    const { setLoggedIn, loggedIn } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [loading, isLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [userId, setUserId] = useState("");
    const currentToken = localStorage.getItem("loginToken");
    // contact name: eg: telegram, youtube, linkedin, etc
    const [contactName, setContactName] = useState("");
    // contact info: eg: your email, ig handle, linkedin link etc
    const [contactInfo, setContactInfo] = useState("");

    // search as you type
    const [search, setSearch] = useState("");

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setLoggedIn(true)
                await getContacts(result.data.id);
            }
        });
    };

    const getContacts = async (userId) => {
        axios
            .get(
                process.env.REACT_APP_BACKEND_API + `/api/contacts/${userId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setContacts(res.data.data);
                    isLoading(false);
                }
            })
            .catch((err) => {});
    };

    const addContact = async () => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/api/contacts/add",
                {
                    contactName,
                    contactInfo,
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                }
            )
            .then(async (res) => {
                if (res.data.success) {
                    await getContacts(userId);
                    alert("Contact added!");
                    setContactName("");
                    setContactInfo("");
                } else {
                    alert(res.data.message.message);
                }
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="page">
            <h1>Contacts</h1>
            <nav aria-label="breadcrumb" className="breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Contacts
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
                            value={search}
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                        />
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
                </div>
            </div>
            {loading ? (
                <>
                    <>
                        <Loader />
                    </>
                </>
            ) : (
                <div className="tableContainer card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Contact Name</th>
                                <th scope="col">Contact Information</th>
                                <th scope="col" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder="Add contact name (eg: linkedin, etc)"
                                        value={contactName}
                                        onChange={(e) => {
                                            setContactName(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder="Add contact info (eg: your email, etc)"
                                        value={contactInfo}
                                        onChange={(e) => {
                                            setContactInfo(e.target.value);
                                        }}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <Link
                                        type="button"
                                        className="btn btn-primary addBtn"
                                        onClick={() => {
                                            addContact();
                                        }}
                                    >
                                        Add Contact
                                    </Link>
                                </td>
                            </tr>
                            {contacts.length > 0 ? (
                                <>
                                    {contacts
                                        .filter((contact) =>
                                            contact.contactName
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        )
                                        .sort((a, b) =>
                                            sortBy == 1
                                                ? a.contactName > b.contactName
                                                    ? 1
                                                    : -1
                                                : sortBy == 2
                                                ? b.contactName > a.contactName
                                                    ? 1
                                                    : -1
                                                : -1
                                        )

                                        .map((contact) => {
                                            return (
                                                <ContactRow
                                                    contact={contact}
                                                    refreshData={getContacts}
                                                    key={contact._id}
                                                />
                                            );
                                        })}
                                </>
                            ) : (
                                <>
                                    <EmptyContentRow
                                        colSpan={4}
                                        item={"contacts"}
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

export default ContactList;
