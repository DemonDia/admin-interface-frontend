import React, { useEffect, useContext } from "react";
import { NavbarContext } from "../../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
function LogoutPage(props) {
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(NavbarContext);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setLoggedIn(false);
                // remove localstorage items
                localStorage.clear();
                navigate("/login");
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return <div></div>;
}

export default LogoutPage;
