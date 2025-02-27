import React from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./Dropdowns/CategoryDropdown";

interface DesktopNavProps {
  setSearchQuery: (query: string) => void;
}
const DesktopNav = ({ setSearchQuery }: DesktopNavProps) => {
    // When a category is selected, update searchQuery
     const handleCategorySelect = (category: string) => {
        setSearchQuery(category);
      };
  return (
    <ul className="hidden md:flex items-center gap-6 text-xs font-medium md:text-sm lg:text-base whitespace-nowrap">
        <li ><Link to="/" className="hover:text-gray-600">Home</Link></li>
        <CategoryDropdown setSearchQuery={handleCategorySelect} />
        <li ><Link to="/previousorder" className="hover:text-gray-600">Your Orders</Link></li>
        <li ><Link to="/cart" className="hover:text-gray-600">Wishlist</Link></li>
        <li ><Link to="/about" className="hover:text-gray-600">About Us</Link></li>

    </ul>
  );
};


export default DesktopNav;
