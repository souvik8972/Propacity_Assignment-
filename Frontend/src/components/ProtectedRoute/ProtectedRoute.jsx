import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loginSuccess } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  // Replace with actual authentication logic
  const dispatch = useDispatch();
  const auth=useSelector((state) => state.auth)
const localtokn=localStorage.getItem("token")
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');


  

    if (token) {
      try {
        const userData = user ? JSON.parse(user) : null;
        dispatch(loginSuccess({ user: userData, token }));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       // Redirect to login if token is invalid
      }
    } 

    
  }, [dispatch]);

  const isAuthenticated = auth.token||localtokn; // Example: check localStorage or context for authentication

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
