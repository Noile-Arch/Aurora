const FollowUs = () => {
  return (
    <div className="w-full h-full px-4 md:px-10 lg:px-20">
      <div className="w-full h-full bg-white shadow-lg shadow-secondary rounded-2xl flex md:flex-row flex-col justify-center items-center p-6">
        <div className=" h-full md:w-[35%] w-full flex justify-center items-center">
          <div className="w-full h-[200px] lg:h-full ">
            <img
              src="/collage1.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="lg:w-[30%] lg:h-full h-[200px] flex flex-col justify-center items-center px-10">
          <h1 className="font-bold text-2xl">Follow our Instagram</h1>
          <p className="text-center">
            Discover our freshest creations! Follow Aurora on Instagram for a
            taste of our latest bakes, offers, and more delightful treats.
          </p>
          <button className="px-4 py-1 mt-4 bg-chocolate text-white font-sans rounded-lg">
            Follow
          </button>
        </div>
        <div className=" h-full lg:w-[35%] w-full flex justify-center items-center">
          <div className="w-full h-[200px] lg:h-full">
            <img
              src="/cupcake.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full  object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
