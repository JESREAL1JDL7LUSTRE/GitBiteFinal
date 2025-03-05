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

      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

  return (
    <ul className="hidden md:flex items-center gap-6 text-xs font-medium md:text-sm lg:text-base whitespace-nowrap">
        <li ><Link to="/" className="hover:text-gray-600" onClick={scrollToTop}>Home</Link></li>
        <CategoryDropdown setSearchQuery={handleCategorySelect} />
        <li ><Link to="/previousorder" className="hover:text-gray-600" onClick={scrollToTop}>Your Orders</Link></li>
        <li ><Link to="/cart" className="hover:text-gray-600" onClick={scrollToTop}>Wishlist</Link></li>
        <li ><Link to="/about" className="hover:text-gray-600" onClick={scrollToTop}>About</Link></li>

    </ul>
  );
};


export default DesktopNav;
