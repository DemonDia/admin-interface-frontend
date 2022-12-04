import React,{useContext,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../../context/NavbarContext";
import { defaultAuthCheck } from "../../AuthCheck";
function ErrorPage(props) {
    const { setLoggedIn,loggedIn } = useContext(NavbarContext);

    const navigate = useNavigate()
    const loadPage = async()=>{
        await defaultAuthCheck(navigate).then((res)=>{
            if(res.data.success){
                setLoggedIn(true)
            }
        })
    }
    useEffect(()=>{
        loadPage()
    })
    return (
        <div>
            <div className="messageContainer card">
                <h1>Hello, there is nothing to look here.</h1>
                <Link to="/" type="button" className="btn btn-secondary">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
