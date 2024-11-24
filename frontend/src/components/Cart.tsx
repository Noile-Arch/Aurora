import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className=" h-full py-2 px-2">
      <Link to={"/cart"} className=" h-full text-4xl relative">
        <AiOutlineShoppingCart size={40} />
        <div className="w-full h-full absolute inset-0 flex justify-end items-start">
          <h1 className="rounded-full w-[12px] h-[12px] p-2 flex justify-center items-center bg-chocolate text-white text-[12px] ">
            1
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
