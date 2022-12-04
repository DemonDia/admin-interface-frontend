import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../context/NavbarContext";
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
    const { loggedIn } = useContext(NavbarContext);
    return (
        <nav class="navbar navbar-expand-lg bg-light fixed-top">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">
                    Admin.io
                </Link>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        {loggedIn ? (
                            <>
                                {" "}
                                {loggedInLinks.map((loginLink, index) => {
                                    return (
                                        <li class="nav-item" key={index}>
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
                            <></>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
