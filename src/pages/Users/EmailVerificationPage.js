import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EmailVerificationPage(props) {
    const { userId, token } = useParams();
    const [verified, setVerified] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    useEffect(() => {
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_API}/api/users/verify/${userId}/${token}`
            )
            .then((res) => {
                if (res.data.success) {
                    setVerificationFailed(false);
                    setVerified(true);
                } else {
                    console.log(res.data.message)
                    setVerificationFailed(true);
                    setVerified(false);
                }
            })
            .catch((err) => {
                console.log(err)
                setVerificationFailed(true);
                setVerified(false);
            });
    }, []);
    // check if userId is valid
    // if not valid, show error msg
    // if valid, verify
    // if verified, show OK
    // if already verified, show error
    return (
        <div className="card messageContainer">
            {!verified && !verificationFailed ? (
                <h1>Verifying</h1>
            ) : (
                <>
                    {verified && !verificationFailed ? (
                        <h1>Verified!</h1>
                    ) : (
                        <h1>Failed to verify</h1>
                    )}
                </>
            )}
        </div>
    );
}

export default EmailVerificationPage;
