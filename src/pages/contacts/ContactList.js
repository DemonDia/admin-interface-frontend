import React, { useEffect, ueState, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import ContactRow from "../../components/contacts/ContactRow";
function ContactList(props) {
    const navigate = useNavigate();
    const [loading, isLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const currentToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    // contact name: eg: telegram, youtube, linkedin, etc
    const [contactName, setContactName] = useState("");
    // contact info: eg: your email, ig handle, linkedin link etc
    const [contactInfo, setContactInfo] = useState("");

    // search as you type
    const [search, setSearch] = useState("");

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const getContacts = async () => {
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

    const addContact = async () => {};

    useEffect(() => {
        defaultAuthCheck(navigate, axios);
        getContacts();
    });
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
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                        />
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
                </div>
            </div>
            {loading ? (
                <></>
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
                                            setContactName(e);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder="Add contact info (eg: your email, etc)"
                                        value={contactInfo}
                                        onChange={(e) => {
                                            setContactInfo(e);
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
                            {contacts ? (
                                <>
                                    {contacts
                                        .filter((contact) =>
                                            contact.contactname
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        )
                                        .sort((a, b) =>
                                            sortBy == 1
                                                ? a.contactname > b.contactname
                                                    ? 1
                                                    : -1
                                                : sortBy == 2
                                                ? b.contactname > a.contactname
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
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ContactList;
