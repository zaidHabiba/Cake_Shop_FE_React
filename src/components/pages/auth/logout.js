import React from "react";
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom";
import Authenticate from "../../basic/auth/authenticate";

const Logout = () => {
    if (Cookies.get('token')) {
        Authenticate.user = undefined;
        Cookies.remove('token');
    }
    return <Redirect to='/'/>
};
export default Logout;