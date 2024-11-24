import { Link } from "react-router-dom";

const Logo = ({ image }: { image: string }) => {
  return (
    <Link to={"/"} className="cursor-pointer">
      <img
        src={image}
        alt=""
        className="md:w-[180px] w-[120px] h-full rounded-full"
      />
    </Link>
  );
};

export default Logo;
