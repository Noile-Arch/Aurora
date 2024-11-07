const Advantage = () => {
  return (
    <div className="w-full h-full flex flex-wrap justify-around items-center px-4 lg:px-20 xl:px-40">
      <figure className="w-[300px] h-[300px]  flex flex-col justify-center items-center">
        <div className="w-[220px] h-[220px] rounded-full ">
          <img
            src="/handmade.jpg"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center lg:px-10 text-center">
          <h1 className="font-bold text-lg">High quality</h1>
          <p className="">Handmade Cakes & Natural ingredients</p>
        </div>
      </figure>
      <figure className="w-[350px] h-[350px]  flex flex-col justify-center items-center">
        <div className="w-[280px] h-[280px] rounded-full bg-gray-200">
        <img
            src="/gift.jpg"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center lg:px-[70px] text-center">
          <h1 className="font-bold text-lg">Sweet gift</h1>
          <p className="">Delicious Chocolate gift box for each client</p>
        </div>
      </figure>
      <figure className="w-[300px] h-[300px]  flex flex-col justify-center items-center">
        <div className="w-[220px] h-[220px] rounded-full bg-gray-200">
        <img
            src="/delivery.jpg"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center lg:px-10 text-center">
          <h1 className="font-bold text-lg">Fast Delivery </h1>
          <p className="">Same-day cake delivery anywhere</p>
        </div>
      </figure>
    </div>
  );
};

export default Advantage;
