import { FaCartPlus } from "react-icons/fa6"
import { productType } from "../../types/types"

const ProductCard = ({slide}:{slide:productType}) => {
  return (
    <div
    key={slide.id}
    className="lg:w-[250px] xl:w-[340px] w-full h-[450px] relative lg:px-4 px-2 shadow-lg"
  >
    <img
      className={`w-full h-[75%] object-cover object-left rounded-t-lg ${
        slide.mirror ? "scale-x-[-1]" : ""
      }`}
      src={slide.imageUrl}
      alt={slide.alt}
    />
    <div className="w-full h-[25%] border-gray-500 bg-black border rounded-b-3xl flex justify-between items-center px-4">
      <div>
        <h1 className="text-lg font-bold">{slide.title}</h1>
        <p>
          From{" "}
          <span className="font-bold text-chocolate px-2">
            Ksh.{slide.price}
          </span>
        </p>
      </div>
      <div className="bg-primary rounded-full p-2">
        <FaCartPlus size={24} />
      </div>
    </div>
  </div>
  )
}

export default ProductCard