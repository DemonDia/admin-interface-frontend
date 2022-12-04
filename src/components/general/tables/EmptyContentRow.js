import React from "react";

function EmptyContentRow(props) {
    return (
        <tr>
            <td colSpan={props.colSpan}>
                <div className="emptyMsg">
                    <h4>No {props.item} available to display.</h4>
                </div>
            </td>
        </tr>
    );
}

export default EmptyContentRow;
