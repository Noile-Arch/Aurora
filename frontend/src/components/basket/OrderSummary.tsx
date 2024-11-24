const OrderSummary = ({
  total,
  subTotal,
}: {
  total: number;
  subTotal: number;
}) => {
  return (
    <div className="w-full h-full text-[#888787] p-4 flex flex-col justify-start items-start gap-4">
      <h1 className="font-semibold font-DreamToBerich text-black text-lg">
        Order Summary
      </h1>
      <div className="w-full flex justify-between items-center">
        <h1 className="">Subtotal</h1>
        <p className="text-black font-semibold">
          Ksh. <span>{subTotal}</span>
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="">Delivery</h1>
        <p className="text-[#2cb92c]">Free</p>
      </div>
      <hr className="w-full mt-4" />
      <div className="w-full flex justify-between items-center">
        <h1 className="">Total</h1>
        <p className=" text-chocolate font-bold text-2xl">Ksh. {total}</p>
      </div>
      <div className="w-full mt-4">
        <button
          type="button"
          className="w-full flex p-2 justify-center items-center bg-chocolate rounded-md"
        >
          <p className="text-white font-semibold">Order</p>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
