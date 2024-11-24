
import { productType } from "../../types/types";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";

const BasketCard = ({
  product,
  quantity,
  onQuantityChange,
}: {
  product: productType;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
}) => {
  const increment = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(product.id, newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    onQuantityChange(product.id, newQuantity);
  };

  return (
    <div
      key={product.id}
      className="lg:w-[520px] xl:w-[700px] w-[300px] h-[120px] relative border-b-2 border-[#d7d5d5]"
    >
      <div className="w-full h-full px-2 flex justify-start items-center gap-4 relative">
        <figure>
          <img
            src={product.imageUrl}
            loading="lazy"
            alt=""
            className="w-[100px] object-cover h-[100px] rounded-xl"
          />
        </figure>
        <div className="h-full py-2 flex flex-1 justify-between items-center">
          <div className="flex flex-col justify-start gap-2 items-start">
            <h1 className="font-semibold">{product.title}</h1>
            <div className="flex justify-center items-center gap-4">
              <button type="button" onClick={decrement}>
                <h1 className="w-8 h-8 text-lg bg-gray-300 flex justify-center items-center rounded-full">
                  <FaMinus />
                </h1>
              </button>
              <p>{quantity}</p>
              <button type="button" onClick={increment}>
                <h1 className="w-8 h-8 text-lg bg-gray-300 flex justify-center items-center rounded-full">
                  <IoMdAdd />
                </h1>
              </button>
            </div>
          </div>
          <div className="h-full flex flex-col justify-between items-end">
            <h1>Ksh.{product.price}</h1>
          </div>
          <p>Ksh. {quantity * product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
