import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className=" h-full bg-chocolate rounded-full py-2 px-2">
      <Link to={"/"} className=" h-full text-4xl">
        <AiOutlineShoppingCart size={28}/>
      </Link>
    </div>
  );
};

export default Cart;
