import { Link } from "react-router-dom";

const Button = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      to={href}
      role="button"
      className="w-full h-auto p-4 items-center justify-center flex text-[black] font-semibold capitalize bg-[#98fb98] rounded-lg cursor-pointer text-md"
    >
      {title}
    </Link>
  );
};

export default Button;
