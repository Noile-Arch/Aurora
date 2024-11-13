import { data } from "../../data/mydata";

import FavouritesCard from "./FavouritesCard";

const Favourites = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full  rounded-2xl border-2  flex flex-col justify-start items-start">
        <h1 className="h-[60px] rounded-t-2xl w-full bg-chocolate flex justify-start items-center px-10 text-white text-lg font-bold">
          Favourites
        </h1>
        <div className="w-full h-auto flex justify-center items-center flex-wrap gap-4 py-4 px-4 overflow-y-scroll no-scrollbar">
          {data.map((product) => (
            <FavouritesCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
