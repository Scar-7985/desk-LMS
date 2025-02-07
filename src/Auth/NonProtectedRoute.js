import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Define';

const NonProtectedRoute = () => {
    return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default NonProtectedRoute;
