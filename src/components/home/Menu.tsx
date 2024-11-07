import { Link } from "react-router-dom";
import { data } from "../../data/mydata";
import ProductCard from "../shared/ProductCard";

const Menu = () => {
  return (
    <div className="w-full h-full px-4 md:px-10 lg:px-20 xl:px-20 flex flex-col justify-start items-center">
      <div className="w-full h-20 flex justify-center flex-wrap items-center font-semibold">
        <Link
          to={"/"}
          className="px-5 py-1 rounded-2xl text-white bg-chocolate"
        >
          Cake
        </Link>
        <Link to={"/"} className="px-5 py-1 rounded-2xl">
          Cup Cakes
        </Link>
        <Link to={"/"} className="px-5 py-1 rounded-2xl">
          Cookies
        </Link>
        <Link to={"/"} className="px-5 py-1 rounded-2xl">
          Doughuts
        </Link>
        <Link to={"/"} className="px-5 py-1 rounded-2xl">
          Brownies
        </Link>
        <Link to={"/"} className="px-5 py-1 rounded-2xl">
          Cheesecake
        </Link>
      </div>
      <div className="w-full h-auto flex justify-center items-center flex-wrap gap-4 py-4">
        {data.map((product)=><ProductCard product={product} key={product.id}/>)}
      </div>
    </div>
  );
};

export default Menu;
