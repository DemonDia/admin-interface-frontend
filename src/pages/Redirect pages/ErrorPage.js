import React from "react";
import { Link } from "react-router-dom";
function ErrorPage(props) {
    return (
        <div>
            <h1>Hello, there is nothing to look here.</h1>
            <Link to ="/" type="button" className="btn btn-secondary">Back</Link>
        </div>
    );
}

export default ErrorPage;
