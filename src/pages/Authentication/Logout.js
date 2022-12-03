import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
function LogoutPage(props) {
    const navigate = useNavigate();
    useEffect(() => {
        defaultAuthCheck(navigate, axios);
        // remove localstorage items
        localStorage.clear();
        navigate("/login");
    }, []);
    return <div></div>;
}

export default LogoutPage;
