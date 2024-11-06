import { FaCartPlus } from "react-icons/fa6"
import { productType } from "../../types/types"

const ProductCard = ({product}:{product:productType}) => {
  return (
    <div
    key={product.id}
    className="lg:w-[250px] xl:w-[300px] w-[250px] h-[400px] relative shadow-lg rounded-xl"
  >
    <img
      className={`w-full h-[75%] object-cover object-left rounded-t-xl ${
        product.mirror ? "scale-x-[-1]" : ""
      }`}
      src={product.imageUrl}
      alt={product.alt}
    />
    <div className="w-full h-[25%] bg-transparent flex justify-between items-center px-4">
      <div>
        <h1 className="text-lg font-bold">{product.title}</h1>
        <p>
          From{" "}
          <span className="font-bold text-chocolate px-2">
            Ksh.{product.price}
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