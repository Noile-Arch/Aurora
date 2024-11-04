import { FaTruckFast } from "react-icons/fa6";
import { RiGift2Line } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiCake } from "react-icons/pi";

const TrustUs = () => {
  return (
    <div className="w-full h-full flex justify-center items-center px-4 text-primary">
      <div className="w-full text-[14px] lg:text-[18px] flex justify-center items-center flex-wrap md:gap-40 lg:font-sans gap-8">
        <figure className="flex  flex-col justify-center items-center gap-2">
          <FaTruckFast className="lg:text-[120px] sm:text-[80px] text-[40px]" />
          <p className="">Fast Delivery</p>
        </figure>
        <figure className="flex flex-col justify-center items-center gap-2">
          <RiGift2Line className="lg:text-[120px] sm:text-[80px] text-[40px]" />
          <p className="">Gifts</p>
        </figure>
        <figure className="flex flex-col justify-center items-center gap-2">
          <RiSecurePaymentLine  className="lg:text-[120px] sm:text-[80px] text-[40px]" />
          <p className="">Safe Payment</p>
        </figure>
        <figure className="flex flex-col justify-center items-center gap-2">
          <PiCake className="lg:text-[120px] sm:text-[80px] text-[40px]" />
          <p className="">Fresh and Yummy</p>
        </figure>
      </div>
    </div>
  );
};

export default TrustUs;
