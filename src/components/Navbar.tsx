import { Link } from "react-router-dom";
import Search from "./Search";
import Cart from "./Cart";

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
          <Link to={"/"}>Contact</Link>
        </div>
        <div className="w-auto flex justify-end items-center gap-5">
          <Search />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
