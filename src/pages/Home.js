import React, { useEffect } from "react";
import { defaultAuthCheck } from "../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home(props) {
    const navigate = useNavigate();
    useEffect(() => {
        defaultAuthCheck(navigate,axios);
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
