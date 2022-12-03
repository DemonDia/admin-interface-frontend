import React, { useEffect } from "react";
import { defaultAuthCheck } from "../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OptionContainer from "../components/general/OptionContainer";
function Home(props) {
    const navigate = useNavigate();
    useEffect(() => {
        defaultAuthCheck(navigate, axios);
    }, []);
    const menuOptions = [
        {
            page: "skills",
            pageName: "Manage Skills",
            background: "#5465FF",
            color: "white",
        },
        {
            page: "experience",
            pageName: "Manage Experiences",
            background: "#4A5BF2",
            color: "white",
        },
        {
            page: "projects",
            pageName: "Manage Projects",
            background: "#495AF3",
            color: "white",
        },
        {
            page: "contacts",
            pageName: "Manage Contacts",
            background: "#4859EE",
            color: "white",
        },

        {
            page: "resume",
            pageName: "Generate Resume",
            background: "#4657EF",
            color: "white",
        },
        {
            page: "user",
            pageName: "Profile",
            background: "#3C4FF8",
            color: "white",
        },
        {
            page: "logout",
            pageName: "Logout",
            background: "#374BFC",
            color: "white",
        },
    ];

    return (
        <div>
            <h1>Main Menu</h1>
            <nav aria-label="breadcrumb" className = "breadcrumbContainer card">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        Home 
                    </li>
                </ol>
            </nav>
            <div className="mainMenu">
                <div className="row">
                    {menuOptions.map((menuOption) => {
                        return (
                            <OptionContainer
                                page={menuOption.page}
                                pageName={menuOption.pageName}
                                background={menuOption.background}
                                color={menuOption.color}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
