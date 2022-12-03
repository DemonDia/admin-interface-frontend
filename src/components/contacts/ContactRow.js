import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, SaveIcon, CancelIcon } from "../general/icons";
import axios from "axios";
function ContactRow(props) {
    const [editing, setEditing] = useState(false);
    const [contactName, setContactName] = useState(props.contact.contactName);
    const [contactInfo, setContactInfo] = useState(props.contact.contact);
    const currentToken = localStorage.getItem("loginToken");

    // =============save=============
    const saveContact = async () => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + "/api/contacts/",
                {
                    id: props.contact._id,
                    contactName: contactName,
                    contactInfo: contactInfo,
                    userId:props.contact.userId
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully saved");
                    props.refreshData(props.contact.userId);
                    setEditing(false);
                } else {
                    alert("Failed to save");
                }
            })
            .catch((err) => {
                alert("Failed to save");
            });
    };

    // =============delete=============
    const deleteContact = async () => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API +
                    `/api/contacts/${props.contact._id}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    data: {
                        userId: props.contact.userId,
                    },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    props.refreshData(props.contact.userId);
                    setEditing(false);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };
    const cancel = () => {
        setEditing(false);
        setContactName(props.contact.contactName);
        setContactInfo(props.contact.contact);
    };
    return (
        <>
            {!editing ? (
                <>
                    <tr>
                        <td align="left">{contactName}</td>
                        <td align="left">{contactInfo}</td>
                        <td>
                            <Link
                                onClick={() => {
                                    setEditing(true);
                                }}
                            >
                                <PencilIcon />
                            </Link>
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    deleteContact();
                                }}
                            >
                                <TrashIcon />
                            </Link>
                        </td>
                    </tr>
                </>
            ) : (
                <>
                    <tr>
                        <td>
                            <input
                                value={contactName}
                                onChange={(e) => {
                                    setContactName(e.target.value);
                                }}
                                className="form-control"
                            />{" "}
                        </td>
                        <td>
                            {" "}
                            <input
                                value={contactInfo}
                                onChange={(e) => {
                                    setContactInfo(e.target.value);
                                }}
                                className="form-control"
                            />{" "}
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    cancel();
                                }}
                            >
                                <CancelIcon />
                            </Link>
                        </td>
                        <td>
                            <Link
                                onClick={() => {
                                    saveContact();
                                }}
                            >
                                <SaveIcon />
                            </Link>
                        </td>
                    </tr>
                </>
            )}
        </>
    );
}

export default ContactRow;
