import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('accessTkn');
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
