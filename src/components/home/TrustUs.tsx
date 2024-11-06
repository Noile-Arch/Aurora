const TrustUs = () => {
  return (
    <div className="w-full h-full flex justify-center items-center px-4 lg:px-20 xl:px-40">
      <div className="w-full text-[14px] lg:text-[18px] flex justify-end items-center flex-wrap md:gap-40 lg:font-sans gap-8">
        <div className="flex flex-col justify-start items-start w-[500px] gap-4">
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
