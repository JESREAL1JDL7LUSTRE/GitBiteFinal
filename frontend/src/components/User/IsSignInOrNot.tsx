import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api";
import { ACCESS_TOKEN, REFRECH_TOKEN } from '@/api/constant';
import SignOut from './SignOut';
import NavbarMenu from '../Navbar/Dropdowns/ProfileDropDown';
import { Button } from '../ui/button';
import useFetchProfile from "../../utils/Hooks/FetchHooks/useFetchProfile"; // Import the custom hook
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-white cursor-pointer">
        {profile?.image ? (
          <img src={profile.image} alt="profile" className="w-full h-full rounded-full object-cover" />
        ) : (
          profile?.first_name?.charAt(0).toUpperCase() || "?"
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 mt-2 bg-white shadow-md rounded-lg">
        <DropdownMenuItem className="flex justify-center" onClick={() => nav("/profile")}>View Profile</DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center"><SignOut /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex gap-2">
      <Button onClick={() => nav("/signin")}>Sign In</Button>
      <Button onClick={() => nav("/signup")}>Sign Up</Button>
    </div>
  );
}
export default IsSignInOrNot;
