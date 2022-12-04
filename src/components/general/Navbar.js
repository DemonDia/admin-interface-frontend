import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
function Navbar(props) {
    const loggedInLinks = [
        { link: "/home", linkName: "Home" },
        { link: "/skills", linkName: "Skills" },
        { link: "/experience", linkName: "Experiences" },
        { link: "/contacts", linkName: "Contacts" },
        { link: "/projects", linkName: "Projects" },
        { link: "/user", linkName: "Profile" },
        { link: "/logout", linkName: "Logout" },
    ];

    const notLoggedInLinks = [
        { link: "/login", linkName: "Login" },
        { link: "/register", linkName: "Register" },
    ];
    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Admin.io
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {props.loggedIn ? (
                            <>
                                {loggedInLinks.map((loginLink, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link
                                                className="nav-link"
                                                to={loginLink.link}
                                            >
                                                {loginLink.linkName}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {notLoggedInLinks.map((loginLink, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link
                                                className="nav-link"
                                                to={loginLink.link}
                                            >
                                                {loginLink.linkName}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
