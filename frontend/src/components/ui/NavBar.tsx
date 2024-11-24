/* eslint-disable @typescript-eslint/no-unused-vars */
import Logo from "./Logo";
import {
  dashboardNavigationMenus,
  navigationMenus,
} from "../../utils/constants";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { menuVariants } from "../../utils/framer-variants/menuVariants";
import { useSearchParams } from 'react-router-dom';

const accountMenus = [
  {
    id: 1,
    link: "Account",
    href: "/account",
  },
  {
    id: 2,
    link: "Profile",
    href: "/profile",
  },
  {
    id: 3,
    link: "Log Out",
    href: "/sign-in",
  },
];

const NavBar = ({ children }: { children: React.ReactNode }) => {
 
  const [accountToggle, setAccountToggle] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const location = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleAccountToggle = () => {
    setAccountToggle(!accountToggle);
  };
  const handleNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setSearchParams({ q: searchValue || "", location: "" }); 
  }, [searchValue, setSearchParams]);


  return (
    <div className="relative">
      {children}
      {/* larger devices */}
      <nav className="hidden md:flex flex-row justify-between w-full items-center text-[#EDEADE]">
        <Logo image="public\Errandor-logo-white.png" />
        <div className="flex flex-row gap-6 md:text-sm items-center relative">
          {location === "/" ? (
            navigationMenus.map(({ href, id, link }) => (
              <Link
                to={href}
                key={id}
                className="hover:text-[white] transition-colors"
              >
                {link}
              </Link>
            ))
          ) : (
            <>
              {dashboardNavigationMenus
                .filter(
                  ({ link }) =>
                    link === "Post An Errand" || link === "My Errands"
                )
                .map(({ href, id, link }) => (
                  <>
                    <Link
                      to={href}
                      key={id}
                      className="hover:text-[white] transition-colors"
                    >
                      {link}
                    </Link>
                  </>
                ))}
              <div className="flex flex-1 bg-secondary/30 rounded-md p-4 justify-between items-center">
                <input
                  type="text"
                  name="search-errand"
                  id="errand-search"
                  className="outline-none bg-[transparent]"
                  placeholder="Search errands..."
                  value={searchValue}
                  onChange={handleSearch}
                />
                <IoSearchOutline
                  size={20}
                  fill="#3d3d3d"
                  className="cursor-pointer"
                />
              </div>
              <IoMdNotificationsOutline
                size={24}
                className="cursor-pointer"
                onClick={handleNotification}
              />
              <div
                className="size-8 bg-primary rounded-full cursor-pointer flex flex-col"
                onClick={handleAccountToggle}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvakm_zio2J6a-PadL8SE6DjgZOB_5FlJz3w&s"
                  alt="profile picture"
                  className="rounded-full object-cover object-center"
                />
              </div>
            </>
          )}
          {accountToggle && (
            <div className="absolute w-full  h-auto mt-44  mr-0 hidden md:flex items-end justify-end">
              <div className="bg-secondary w-[140px] h-auto rounded-md flex flex-col gap-2 p-4 items-end">
                {accountMenus.map(({ id, link, href }) => (
                  <>
                    <Link
                      to={href}
                      key={id}
                      className="hover:text-[white] transition-colors"
                    >
                      {link}
                    </Link>
                    <hr className="text-[#3d3d3d]" />
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* login buttons */}
        {location === "/" ? (
          <section className="flex flex-row gap-6 items-center">
            <p>Login</p>
            <Button href="/sign-in" title="Get Started" />
          </section>
        ) : (
          <></>
        )}
      </nav>
      <AnimatePresence>
        {isNotificationOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.4)] overflow-hidden flex items-end justify-end"
          >
            <section className="w-[30%] bg-primary h-screen flex flex-col gap-4 p-4">
              <div className="w-full flex p-4  h-[75.4375px] items-center flex-row gap-4 border border-t-0 border-l-0 border-r-0  border-b-[#3d3d3d]">
                <IoMdArrowRoundBack
                  size={24}
                  onClick={() => {
                    setIsNotificationOpen(false);
                  }}
                />
                <h1>Notifications</h1>
              </div>
              <div className="p-4">
                <span className="text-sm">
                  No New Notifications at the moment.
                </span>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
