import { Link } from 'react-router-dom';
import NavbarMenu from "./NavbarMenu";
import IsSignInOrNot from "../Sign/IsSignInOrNot";


const DesctopNavbar = () => {
  return (
    <div className="fixed w-full h-14 border-2 border-green-500 hidden md:flex items-center justify-between px-4">
      <Link to="/">GitBite</Link>
      <div><IsSignInOrNot/></div>
      <div><NavbarMenu /></div>
    </div>
  );
};

export default DesctopNavbar;
