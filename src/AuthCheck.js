import axios from "axios";
const checkAuthStatus = async (successRoute, failRoute, navigate, axiosMgr) => {
    const currentToken = localStorage.getItem("loginToken");
    // await axiosMgr
    //     .get(process.env.REACT_APP_BACKEND_API + "/api/users/me", {
    //         headers: { Authorization: `Bearer ${currentToken}` },
    //     })
    //     .then((res) => {
    //         console.log("res",res)
    //         if(res.data.success){
    //             console.log(username)
    //             localStorage.setItem("userName",res.data.username)
    //             localStorage.setItem("userId",res.data.id)
    //         }
    //         if (successRoute != "" && res.data.success) {
    //             navigate(successRoute);
    //         } else if (failRoute != "" && !res.data.success) {
    //             navigate(failRoute);
    //         }
    //     })
    //     .catch((err) => {
    //         if (failRoute != "") {
    //             navigate(failRoute);
    //         }
    //     });

    const authStatus = await axiosMgr
        .get(process.env.REACT_APP_BACKEND_API + "/api/users/me", {
            headers: { Authorization: `Bearer ${currentToken}` },
        })
        .then()
        .catch((err) => {
            if (failRoute != "") {
                navigate(failRoute);
            }
        });
    if (successRoute != "" && authStatus.data.success) {
        navigate(successRoute);
    } else if (failRoute != "" && !authStatus.data.success) {
        navigate(failRoute);
    }
    return authStatus;
};

const loginPageAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "", navigate, axios);
};

const defaultAuthCheck = async (navigate, axios) => {
    return await checkAuthStatus("", "/login", navigate, axios);
};

const redirectAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "/login", navigate, axios);
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck };
