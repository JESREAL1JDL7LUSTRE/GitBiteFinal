import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, X, ShoppingCartIcon } from "lucide-react";
import IsSignInOrNot from "../Sign/IsSignInOrNot";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-lg w-full z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 cursor-pointer" />
          <p className="font-semibold">BrandName</p>
        </Link>

        <ul className="hidden md:flex items-center gap-4">
          <li>
            <Link to="/" className="hover:text-gray-600">Home</Link>
          </li>
          <NavLinks />
          <li>
            <Link to="/authors" className="hover:text-gray-600">Authors</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-600">About</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4 ml-auto">
          <Button onClick={() => nav("cart")} variant="outline">
            <ShoppingCartIcon />
          </Button>
          <IsSignInOrNot />
        </div>

        <div className="text-3xl md:hidden flex items-center ml-4" onClick={() => setOpen(true)}>
          <Menu />
        </div>
      </div>

        <div className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transform ${
            open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}>
 
        <div className="flex justify-end p-4">
            <button onClick={() => setOpen(false)}>
            <X className="text-2xl" />
            </button>
        </div>

        <ul className="flex flex-col items-center px-6 space-y-4">
            <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <NavLinks />
            <li>
            <Link to="/authors" onClick={() => setOpen(false)}>Authors</Link>
            </li>
            <li>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            </li>
        </ul>
        </div>
    </nav>
  );
}

export default Navbar;