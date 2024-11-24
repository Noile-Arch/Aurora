import { BsStarFill, BsStarHalf } from "react-icons/bs";

const ErrandorCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="capitalize">Kelly Limo</h1>
      <div className="flex flex-row">
        {Array.from([1, 2, 3, 4], () => (
          <BsStarFill className="text-[orange]" />
        ))}
        <BsStarHalf className="text-[orange]" />
      </div>
    </div>
  );
};

export default ErrandorCard;
