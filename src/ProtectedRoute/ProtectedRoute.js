import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('jwtToken');

    if (!isAuthenticated) {
        return <Navigate to="/404" replace />;
    }

    return children;
};

export default ProtectedRoute;
