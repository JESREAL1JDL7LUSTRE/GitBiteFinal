import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, X, ShoppingCart } from "lucide-react";
import IsSignInOrNot from "../Sign/IsSignInOrNot";
import { Button } from "@/components/ui/button";
import SearchFunction from "../SearchFunction";
import CategoryDropdown from "../DropdownThings/CategoryDropdown";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

    // When a category is selected, update searchQuery
    const handleCategorySelect = (category: string) => {
      setSearchQuery(category);
    };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-lg w-full z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 cursor-pointer" />
          <p className="font-semibold">BrandName</p>
        </Link>

        {/* Right-aligned content */}
        <div className="flex items-center gap-6 ml-auto">
          <SearchFunction searchQuery={searchQuery} onSearch={setSearchQuery} />

          <CategoryDropdown setSearchQuery={handleCategorySelect} />

          <ul className="hidden md:flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/authors" className="hover:text-gray-600">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-600">
                About
              </Link>
            </li>
          </ul>

          {/* Cart and User */}
          <Button onClick={() => nav("/cart")} variant="outline">
            <ShoppingCart className="w-6 h-6" />
          </Button>

          <IsSignInOrNot />

          {/* Mobile Menu Button */}
          <div
            className="text-3xl md:hidden flex items-center ml-4 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X className="text-2xl" />
          </button>
        </div>

        <ul className="flex flex-col items-center px-6 space-y-4">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/authors" onClick={() => setOpen(false)}>
              Authors
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
