import { Link } from "react-router-dom";
import Search from "./Search";
import Cart from "./Cart";
import { FaRegEdit } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full h-[80px] bg-transparent backdrop-blur-sm z-50 absolute inset-0 py-2">
      <div className="w-full h-full flex xl:justify-around justify-around items-center  ">
        <Link
          to={"/"}
          className=" h-full flex justify-center items-center gap-4 text-white"
        >
          <img
            src="/Logo.png"
            alt="logo"
            className="w-full h-full rounded-full"
          />
        </Link>
        <div className="xl:flex hidden font-semibold justify-center items-center gap-10">
          <Link to={"/"}>Shop</Link>
          <Link to={"/"}>Sale</Link>
          <Link to={"/"}>Blog</Link>
          <Link to={"/about"}>About Us</Link>
          <Link to={"#contact-us"}>Contact Us</Link>
        </div>
        <div className="w-auto flex justify-end items-center gap-10">
          <div className="flex justify-end items-center gap-2">
            <Search />
            <Cart />
          </div>

          <Link to={'/profile/profile-info'} className="w-[60px] h-[60px] bg-[#bcbaba] rounded-full relative">
            <img
              src="/profile.jpeg"
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="w-full h-full flex justify-end  items-end absolute inset-0 text-white">
              <div className="p-1 bg-chocolate/70 rounded-full"><FaRegEdit className="" /></div>
            
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
