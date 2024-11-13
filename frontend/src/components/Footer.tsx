import { Link } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";

import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
<FaInstagram />;
const Footer = () => {
  return (
    <div className="w-full h-auto bg-greybg flex flex-col justify-start  items-center text-white">
      <section className="w-full h-full flex flex-row justify-between items-center gap-4 px-4 lg:px-10 xl:px-20 lg:py-6 py-4">
        <div className="flex flex-col justify-center items-start gap-4  ">
          <h1 className="text-xl font-semibold">Our newslater</h1>
          <form
            action=""
            className="flex flex-col sm:flex-row justify-center  items-start sm:items-center gap-4"
          >
            <input
              type="email"
              className="lg:w-[250px] px-4 py-2 rounded-xl outline-none bg-[#282627]"
              placeholder="Email ID"
            />
            <button
              type="submit"
              className=" px-4 py-2 text-[14px] sm:text-sm rounded-xl bg-chocolate"
            >
              Subscribe Now
            </button>
          </form>
        </div>
        <div className="flex flex-col w-[250px] md:justify-items-center justify-start items-center gap-4">
          <h1 className="md:text-xl font-semibold">Follow us on</h1>
          <div className="w-full flex justify-end flex-wrap items-center gap-4">
            <Link to="/">
              <TiSocialFacebook
                size={40}
                className="p-2 bg-[#282627] rounded-full"
              />
            </Link>
            <Link to="/">
              <TiSocialTwitter
                size={40}
                className="p-2 bg-[#282627] rounded-full"
              />
            </Link>
            <Link to="/">
              <TiSocialLinkedin
                size={40}
                className="p-2 bg-[#282627] rounded-full"
              />
            </Link>
            <Link to="/">
              <FaInstagram
                size={40}
                className="p-2 bg-[#282627] rounded-full"
              />
            </Link>
          </div>
        </div>
      </section>
      <hr className="w-full border border-[#343434]" />
      <section className="w-full flex lg:justify-between justify-center gap-10 items-start lg:gap-2 px-4 lg:px-10 xl:px-20 lg:py-6 py-4">
        <div className="w-[120px] flex flex-col justify-center items-start gap-4">
          <img src="/Logo.png" alt="" className="w-20 h-20 rounded-full" />
          <h1 className="font-['DreamToBerich'] text-[12px]">Aurora</h1>
        </div>
        <div className="sm:flex hidden text-[#bebebe] lg:justify-between items-start xl:gap-60 md:gap-40 sm:gap-20 gap-10">
          <div className="flex flex-col justify-center gap-2 items-start">
            <h1 className="text-lg text-white font-semibold">Site map</h1>
            <div className="flex flex-col justify-end items-start gap-2">
              <a href="/">Home</a>
              <a href="#assortment">Assortment</a>
              <a href="#about-us">About</a>
              <a href="#advantage">Advantage</a>
              <a href="#menu">Menu</a>
              <a href="#info">Testimonials</a>
              <a href="#contact-us">Contact</a>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 items-start">
            <h1 className="text-lg font-semibold text-white">Explore</h1>
            <div className="flex flex-col justify-start items-start gap-4">
              <Link to="/">Cakes</Link>
              <Link to="/">Cookies</Link>
              <Link to="/">Cupcakes</Link>
              <Link to="/">Brownies</Link>
              <Link to="/">Doughnuts</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-items-center items-start gap-4">
          <h1 className="text-xl font-semibold text-white">Contact us</h1>
          <div className="flex flex-col justify-end items-center gap-1">
            <Link
              to="/"
              className="w-full flex justify-start gap-2 py-2 items-center"
            >
              <MdOutlineEmail
                size={30}
                className="p-2 rounded-full text-white bg-[#282627]"
              />
              <p className="">aurora@gmail.com</p>
            </Link>
            <Link
              to="/"
              className="w-full flex justify-start gap-2 py-2 items-center"
            >
              <FaPhoneAlt
                size={30}
                className="p-2 text-white rounded-full bg-[#282627]"
              />
              <p className="">+254-123456789</p>
            </Link>
            <Link
              to="/"
              className="w-full flex justify-start gap-2 py-2 items-center"
            >
              <IoLocationOutline
                size={30}
                className="p-2 rounded-full text-white bg-[#282627]"
              />
              <p className="">Athi River</p>
            </Link>
          </div>
        </div>
      </section>
      <hr className="w-full border border-[#343434]" />
      <section className="w-full flex justify-center items-center p-4">
        <h1 className="">
          &copy; 2024 -{" "}
          <span className="font-['DreamToBerich'] text-[12px] text-chocolate">
            Auora
          </span>{" "}
        </h1>
      </section>
    </div>
  );
};

export default Footer;
