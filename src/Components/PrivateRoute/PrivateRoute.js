import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = () => {
    const location = useLocation();
    const [loggedInUser] = useContext(UserContext);
    return (
        loggedInUser.isLoggedIn ? <Outlet/> : <Navigate to="/login" replace state={{from: location}} />
    );
};

export default PrivateRoute;