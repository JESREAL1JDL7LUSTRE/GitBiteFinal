import { Link } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import IsSignInOrNot from "../Sign/IsSignInOrNot";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DesctopNavbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  return (
    <div className="sticky top-0 w-full h-14 border-2 border-green-500 hidden md:flex items-center justify-between px-4">
      <Link to="/">GitBite</Link>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-1 rounded-md"
      />
      <div><IsSignInOrNot/></div>
      <div><NavbarMenu /></div>
    </div>
  );
};

export default DesctopNavbar;
