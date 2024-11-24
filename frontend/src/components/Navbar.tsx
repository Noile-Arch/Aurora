import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Search from "./Search";
import Cart from "./Cart";
import { FaRegEdit } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="w-full h-[80px] bg-white z-50 relative py-2">
      <div className="w-full h-full flex xl:justify-around justify-around items-center">
        <Link
          to={"/"}
          className="h-full flex justify-center items-center gap-4 text-white"
        >
          <img
            src="/Logo.png"
            alt="logo"
            className="w-full h-full rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="xl:flex hidden font-semibold justify-center items-center gap-10">
          <Link to={"/"}>Shop</Link>
          <Link to={"/cakes"}>Cakes</Link>
          <Link to={"/about"}>About Us</Link>
          <a href={"#contact-us"}>Contact Us</a>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="xl:hidden fixed top-[80px] left-0 w-full bg-white shadow-lg py-5 px-4"
            >
              <div className="flex flex-col gap-4 font-semibold">
                <Link
                  to={"/"}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-chocolate transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to={"/cakes"}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-chocolate transition-colors"
                >
                  Cakes
                </Link>
                <Link
                  to={"/about"}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-chocolate transition-colors"
                >
                  About Us
                </Link>
                <a
                  href={"#contact-us"}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-chocolate transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-auto flex justify-end items-center sm:gap-10 gap-4">
          <div className="flex justify-end items-center gap-2">
            <Search />
            <Cart />
          </div>

          <Link
            to={"/profile/profile-info"}
            className="w-[60px] h-[60px] bg-[#bcbaba] rounded-full relative"
          >
            <img
              src="/profile.jpeg"
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="w-full h-full flex justify-end items-end absolute inset-0 text-white">
              <div className="p-1 bg-chocolate/70 rounded-full">
                <FaRegEdit />
              </div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-2xl z-50"
          >
            {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
