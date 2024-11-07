const TrustUs = () => {
  return (
    <div className="w-full h-full flex justify-center items-center px-4 lg:px-20 xl:px-40 ">
      <div className="w-full h-full text-[14px] lg:text-[18px] flex md:flex-row flex-col justify-center items-center md:flex-wrap  lg:font-sans gap-10 px-10">
        <div className=" h-full lg:w-[50%] flex-1 flex justify-center items-center">
          <div className=" h-full w-full py-4">
            <img
              src="https://img.freepik.com/premium-photo/collage-photos-cake-coffee-collage-delicious-food_1135385-34413.jpg?w=1060"
              alt=""
              loading="lazy"
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start lg:w-[50%] gap-4">
          <h1 className="font-bold text-2xl">Established since 2024</h1>
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
            dolores obcaecati unde hic accusantium voluptates doloribus cumque
            quo maxime laborum rem, illum molestiae, architecto dignissimos
            dolor. Aperiam dolorum expedita ea.
          </p>
          <div className="w-full h-auto flex justify-between items-center flex-wrap">
            <div className="block">
              <h1 className="font-bold text-3xl">268 +</h1>
              <p className="text-primary">Pastry Chef</p>
            </div>
            <div className="block">
              <h1 className="font-bold text-3xl">120</h1>
              <p className="text-primary">Cake Variant</p>
            </div>
            <div className="block">
              <h1 className="font-bold text-3xl">100%</h1>
              <p className="text-primary">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustUs;
