import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api";
import { ACCESS_TOKEN, REFRECH_TOKEN } from '@/api/constant';
import SignOut from './SignOut';
import NavbarMenu from '../Navbar/NavbarMenu';
import { Button } from '../ui/button';
import useFetchProfile from "../../utils/Hooks/FetchHooks/useFetchProfile"; // Import the custom hook

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

const isLoggedIn = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

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
  const [showDropdown, setShowDropdown] = useState(false);
  const { profile, loading } = useFetchProfile(); // ✅ Correct usage
  const nav = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await isLoggedIn();
      setIsLoggedInState(loggedInStatus);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedInState === null || loading) {
    return <div>Loading...</div>; // ✅ Show loading state properly
  }


  return isLoggedInState ? (
    <div style={{ position: "relative" }}>
      {/* Profile Avatar Button */}
      <div
        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-white cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {profile?.first_name ? profile.first_name.charAt(0).toUpperCase() : "?"}
      </div>

      {showDropdown && (
        <div
          className="flex flex-col p-4 gap-2"
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <NavbarMenu />
          <SignOut />
        </div>
      )}
    </div>
  ) : (
    <div className="flex gap-2">
      <Button onClick={() => nav("/signin")}>Sign In</Button>
      <Button onClick={() => nav("/signup")}>Sign Up</Button>
    </div>
  );
}

export default IsSignInOrNot;
