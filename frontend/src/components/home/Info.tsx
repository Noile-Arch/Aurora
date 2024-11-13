import { RiDoubleQuotesL } from "react-icons/ri";

const Info = () => {
  return (
    <div className="w-full h-full  px-4 md:px-10  lg:px-20">
      <div className="w-full h-full flex md:flex-row flex-col justify-around items-center gap-4">
        <div className="lg:w-[420px] w-full py-4  lg:h-[320px] h-auto bg-white shadow-md shadow-secondary rounded-2xl flex flex-col gap-2 justify-center items-center px-4">
          <p className="text-chocolate font-bold text-5xl">
            <RiDoubleQuotesL />
          </p>
          <p className="text-center font-semibold">
            Aurora’s pastries are simply delightful! I ordered a selection for a
            family gathering, and every single treat was a hit. The flavors are
            authentic, and you can tell everything is freshly made. The online
            ordering process was easy, and delivery was right on time!
          </p>
          <div className="w-[80px] h-[80px] rounded-full bg-gray-200">
            <img
              src="/wade.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <h1 className="text-[#676767]">Wade Warren</h1>
        </div>
        <div className="lg:w-[420px] w-full py-4 lg:h-[320px] bg-white shadow-md shadow-secondary rounded-2xl flex flex-col gap-2 justify-center items-center px-4">
          <p className="text-chocolate font-bold text-5xl">
            <RiDoubleQuotesL />
          </p>
          <p className="text-center font-semibold">
            I can’t recommend Aurora enough! I tried their sourdough bread and
            some pastries, and I’m officially hooked. The website is super
            user-friendly, and I love how they update their Instagram with
            what’s fresh. It makes it so easy to choose my next order.
          </p>
          <div className="w-[80px] h-[80px] rounded-full bg-gray-200">
            <img
              src="/darel.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <h1 className="text-[#676767]">Darel Steward</h1>
        </div>
        <div className="lg:w-[420px] w-full py-4 lg:h-[320px] bg-white shadow-md shadow-secondary rounded-2xl flex flex-col gap-2 justify-center items-center px-4">
          <p className="text-chocolate font-bold text-5xl">
            <RiDoubleQuotesL />
          </p>
          <p className="text-center font-semibold">
            Aurora brings bakery heaven to my doorstep! I’m a big fan of their
            seasonal items and specials. The website is smooth, the packaging is
            beautiful, and the taste is unbeatable. Perfect for any occasion or
            just a treat for yourself!
          </p>
          <div className="w-[80px] h-[80px] rounded-full bg-gray-200">
            <img
              src="/brooklyn.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <h1 className="text-[#676767]">Brooklyn Simmons</h1>
        </div>
      </div>
    </div>
  );
};

export default Info;
