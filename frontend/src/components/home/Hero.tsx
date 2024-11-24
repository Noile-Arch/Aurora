const Hero = () => {
  return (
    <section className="h-full w-full">
      <div className="w-full lg:text-5xl sm:text-2xl font-bold h-full flex flex-col-reverse lg:flex-row justify-center  gap-4 items-center px-4 md:px-10 xl:px-[80px]">
        <div className="lg:w-[60%] sm:px-10 sm:w-full w-full h-full flex flex-col justify-center lg:items-start items-center">
          <h1 className="w-full font-['DreamToBerich'] text-black  lg:text-2xl text-lg gap-7 flex flex-col justify-center items-center lg:items-start">
            Artisan Cakes for <br />
            <span className="lg:text-7xl text-4xl sm:text-5xl text-chocolate">
              Happiness
            </span>
          </h1>
          <p className="w-full font-sans lg:w-[50%] text-lg py-6">
            Discover our deliciously crafted cakes made with the finest
            ingredients. Perfect for any occasion, our treats will satisfy every
            craving. Celebrate every moment with a sweet delight!
          </p>
          <button className="px-8 py-3 mt-4 text-lg bg-chocolate text-white font-sans rounded-lg">
            Order Now!
          </button>
        </div>
        <div className="lg:w-[40%] w-full sm:h-[300px] lg:h-full h-full flex justify-center items-center p-2">
          <div className="w-full h-full pt-[80px]  ">
            <img
              src="https://img.freepik.com/free-photo/gourmet-chocolate-dessert-with-colorful-candy-decorations-generated-by-ai_188544-15708.jpg?t=st=1732440410~exp=1732444010~hmac=1b380178b29a316ae4640ffada202a5ee1a4f3b534e79dba9c7353fe9000dd05&w=1380"
              alt=""
              loading="lazy"
              className="w-full h-full rounded-2xl object-right object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
