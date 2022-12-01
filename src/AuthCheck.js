import axios from "axios";

const checkAuthStatus = async (successRoute, failRoute, navigate, axiosMgr) => {
    const currentToken = localStorage.getItem("loginToken");
    console.log(process.env.REACT_APP_BACKEND_API + "/api/users/me");
    await axiosMgr
        .get(process.env.REACT_APP_BACKEND_API + "/api/users/me", {
            headers: { Authorization: `Bearer ${currentToken}` },
        })
        .then((res) => {
            console.log(res);
            if(res.data.success){
                localStorage.setItem("userName",res.data.username)
                localStorage.setItem("userId",res.data.id)
            }
            if (successRoute != "" && res.data.success) {
                navigate(successRoute);
            } else if (failRoute != "" && !res.data.success) {
                navigate(failRoute);
            }
        })
        .catch((err) => {
            console.log(err);
            if (failRoute != "") {
                navigate(failRoute);
            }
        });
};

const loginPageAuthCheck = async (navigate) => {
    await checkAuthStatus("/home", "", navigate,axios);
};

const defaultAuthCheck = async (navigate, axios) => {
    await checkAuthStatus("", "/login", navigate, axios);
};

const redirectAuthCheck = async (navigate) => {
    await checkAuthStatus("/home", "/login", navigate,axios);
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck };
