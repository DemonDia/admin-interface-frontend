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
            background: "red",
            color: "white",
        },
        {
            page: "experience",
            pageName: "Manage Experiences",
            background: "orange",
            color: "white",
        },
        {
            page: "projects",
            pageName: "Manage Projects",
            background: "red",
            color: "white",
        },
        {
            page: "contacts",
            pageName: "Manage Contacts",
            background: "orange",
            color: "white",
        },

        {
            page: "resume",
            pageName: "Generate Resume",
            background: "orange",
            color: "white",
        },
        {
            page: "user",
            pageName: "Profile",
            background: "red",
            color: "white",
        },
        {
            page: "logout",
            pageName: "Logout",
            background: "red",
            color: "white",
        },
    ];

    return (
        <div>
            <h1>Welcome, what would you like to do today?</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        Home 
                    </li>
                </ol>
            </nav>
            <div className="mainMenu">
                <div class="row">
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
