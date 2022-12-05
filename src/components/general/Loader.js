import React from "react";

function Loader(props) {
    return (
        <div>
            <div className="card loaderContainer">
                <div className="spinner-border" role="status" style = {{color:"#0011A7"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <br></br>
                <h5>Loading ...</h5>
            </div>
        </div>
    );
}

export default Loader;
