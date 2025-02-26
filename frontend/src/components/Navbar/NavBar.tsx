import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import name from "../../assets/logoName.png";
import { Menu, X, Heart } from "lucide-react";
import IsSignInOrNot from "../User/IsSignInOrNot";
import { Button } from "@/components/ui/button";
import SearchFunction from "./SearchFunction";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavBar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 right-0 bg-white shadow-md w-full z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center g">
          <img src={logo} alt="logo" className="h-12 cursor-pointer" />
          <img src={name} alt="logo" className="h-12 cursor-pointer" />

        </Link>

        {/* Main Navigation */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">

          <div className="flex justify-end min-w-[100px] md:min-w-[100px] max-w-[250px] md:max-w-[300px]">
            <SearchFunction searchQuery={searchQuery} onSearch={setSearchQuery} />
          </div>

          <DesktopNav setSearchQuery={setSearchQuery} />

          <Button
            onClick={() => navigate("/cart")}
            variant="outline"
            className="p-2 md:p-3"
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <IsSignInOrNot />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-1">
              {open ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="block md:hidden">
          <MobileNav open={open} setOpen={setOpen} setSearchQuery={setSearchQuery} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
