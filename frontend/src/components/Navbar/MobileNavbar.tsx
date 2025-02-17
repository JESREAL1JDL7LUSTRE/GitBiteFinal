import NavbarMenu from "./NavbarMenu";
import IsSignInOrNot from "../Sign/IsSignInOrNot";

const MobileNavbar = () => {
  return (
    <div className="w-full h-14 border-2 border-green-500 flex md:hidden items-center justify-between px-4">
      <div>Mobile Navbar</div>
      <div><IsSignInOrNot/></div>
      <div><NavbarMenu /></div>
    </div>
  );
};

export default MobileNavbar;
