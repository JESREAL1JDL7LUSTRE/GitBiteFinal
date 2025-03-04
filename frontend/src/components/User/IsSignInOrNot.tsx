import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api";
import { ACCESS_TOKEN, REFRECH_TOKEN } from '@/api/constant';
import SignOut from './SignOut';
import { Button } from '../ui/button';
import useFetchProfile from "../../utils/Hooks/FetchHooks/useFetchProfile"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion"; 

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
  const { profile, loading } = useFetchProfile(); 
  const nav = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await isLoggedIn();
      setIsLoggedInState(loggedInStatus);
    };

    checkLoginStatus();
  }, []);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggle((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (isLoggedInState === null || loading) {
    return <div>Loading...</div>; 
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
      <Button
        className={`relative overflow-hidden px-10 py-2 text-white rounded-lg transition-all duration-300 ${toggle ? "bg-black" : "bg-[#a0c878]"}`}
        onClick={() => nav("/signin")}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={toggle ? "signup" : "signin"}
            initial={{ x: 30, opacity: 0 }} // Start from the right
            animate={{ x: 0, opacity: 1 }}  // Move to the center
            exit={{ x: -30, opacity: 0 }}   // Exit to the left
            transition={{ duration: 0.4 }}
            className="absolute w-full text-center"
          >
            {toggle ? "Sign Up" : "Sign In"}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  );
}

export default IsSignInOrNot;
