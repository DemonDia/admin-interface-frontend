import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectAuthCheck } from '../../AuthCheck';
function EmptyPage(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        redirectAuthCheck(navigate)
    })
    
    return (
        <div>
            <div className="messageContainer card">
                <h1>Redirecting ...</h1>
            </div>
        </div>
    );
}

export default EmptyPage;