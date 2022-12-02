import React from "react";
import { Link } from "react-router-dom";
function OptionContainer(props) {
    return (
        <div className="optionContainer col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <Link to={"/" + props.page} className="card optionBox" style = {{background:props.background, color:props.color}}>
                <h2>{props.pageName}</h2>
            </Link>
        </div>
    );
}

export default OptionContainer;
