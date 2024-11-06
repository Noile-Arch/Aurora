const Hero = () => {
  return (
    <section className="h-full w-full ">
      <div className="w-full text-5xl font-bold h-full flex justify-around items-center flex-wrap px-4 md:px-10 xl:px-40">
        <div className="w-full h-full flex flex-col justify-center items-start">
          <h1 className="font-['DreamToBerich'] text-black lg:text-2xl text-lg gap-7 flex flex-col">
            Artisan Cakes for <br />
            <span className="lg:text-7xl text-4xl sm:text-5xl text-chocolate">Happiness</span>
          </h1>
          <p className="font-sans lg:w-[50%] sm:w-[70%] text-lg py-6">
            Discover our deliciously crafted cakes made with the finest
            ingredients. Perfect for any occasion, our treats will satisfy every
            craving. Celebrate every moment with a sweet delight!
          </p>
          <button className="px-8 py-3 mt-4 text-lg bg-chocolate text-white font-sans rounded-lg">
            Order Now!
          </button>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default Hero;
