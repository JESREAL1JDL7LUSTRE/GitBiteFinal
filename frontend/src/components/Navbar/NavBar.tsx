import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, SearchIcon, ShoppingCartIcon } from "lucide-react";
import NavMenu from "./NavMenu";
import IsSignInOrNot from "../Sign/IsSignInOrNot";
import { Button } from "@/components/ui/button";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  return (
    <nav className="sticky bg-white top-0 left-0 right-0 shadow-lg">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-2 md:w-auto w-full flex justify-between h-">
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="md:cursor-pointer h-10 "/>
                <p>BrandName</p>
                </Link>
            <div className="flex items-center gap-2 ml-auto">
            <Button onClick={() => nav("cart")} variant="outline"><ShoppingCartIcon /></Button>
            <IsSignInOrNot /></div>         
          <div className="text-3xl md:hidden flex items-center" onClick={() => setOpen(!open)}>
            <Menu name={`${open ? "close" : "menu"}`}></Menu>
          </div>
        </div>
        <ul className="md:flex hidden items-center gap-2 py-2">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <NavMenu />
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
        </ul>
        
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-20
        duration-500 ${open ? "right-0" : "right-[-100%]"}
        `}
        >
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <NavMenu />
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;