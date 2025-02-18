import NavbarMenu from "./NavbarMenu";
import IsSignInOrNot from "../Sign/IsSignInOrNot";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <div className="fixed w-full h-14 border-2 border-green-500 flex md:hidden items-center justify-between px-4">
      <Link to="/">GitBite</Link>
      <div><IsSignInOrNot/></div>
      <div><NavbarMenu /></div>
    </div>
  );
};

export default MobileNavbar;
