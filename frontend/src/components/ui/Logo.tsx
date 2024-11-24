import { Link } from "react-router-dom";

const Logo = ({ image }: { image: string }) => {
  return (
    <Link to={"/"} className="cursor-pointer">
      <img src={image} alt="" className="w-auto md:w-[160px] h-full rounded-full"/>
    </Link>
  );
};

export default Logo;
