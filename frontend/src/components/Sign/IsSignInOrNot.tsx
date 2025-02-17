import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api";
import { ACCESS_TOKEN, REFRECH_TOKEN } from '@/api/constant';
import SignOut from './SignOut';

// Utility function to check the token and refresh it if needed
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRECH_TOKEN);
  try {
    const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
    if (res.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};

// Utility function to check if the token is valid
const isLoggedIn = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    // If the token is expired, attempt to refresh it
    if (!tokenExpiration || tokenExpiration < now) {
      const refreshed = await refreshToken();
      if (!refreshed) return false;
    }

    return true;
  } catch (error) {
    console.error('Token validation error', error);
    return false;
  }
};

function IsSignInOrNot() {
  const [isLoggedInState, setIsLoggedInState] = useState<boolean | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    // Check login status on component mount
    const checkLoginStatus = async () => {
      const loggedInStatus = await isLoggedIn();
      setIsLoggedInState(loggedInStatus);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedInState === null) {
    return <div>Loading...</div>; // You can add a spinner or a loading indicator
  }

  return isLoggedInState ? (
    <SignOut /> // If logged in, show SignOut button
  ) : (
    <div>
      <div>
        <button onClick={() => nav('/signin')}>Sign In</button>
      </div>
      <div>
        <button onClick={() => nav('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default IsSignInOrNot;
