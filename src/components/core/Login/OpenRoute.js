import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}) => {
    const token=useSelector((state)=>state.auth.token);
    console.log("open route.........",token);
    if(token==null) {
        return children;
    }
    return <Navigate to={"/dashboard/my-profile"}></Navigate>
};

export default OpenRoute;