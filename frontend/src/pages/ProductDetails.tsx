import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../hooks/use/user";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-chocolate border-t-transparent"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === cartItem.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    navigate('/cart');
  };

  return (
    <div className="min-h-[600px] bg-gray-50">
      <div className="container mx-auto space-y-6 px-4 py-6">
        {/* Main Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100 lg:grid lg:grid-cols-2 lg:gap-8"
        >
          {/* Image Section */}
          <div className="relative h-[300px] lg:h-[500px]">
            <div className="h-full overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
            <button className="absolute right-4 top-4 rounded-full bg-white p-3 text-chocolate shadow-lg transition hover:scale-110 hover:bg-chocolate hover:text-white">
              <IoMdHeartEmpty size={24} />
            </button>
          </div>

          {/* Details Section */}
          <div className="flex h-full flex-col pt-6 lg:pt-0">
            <div className="mb-4">
              <span className="rounded-full bg-chocolate/10 px-3 py-1 text-sm text-chocolate">
                {product.category}
              </span>
            </div>
            
            <h1 className="mb-3 font-DreamToBerich text-3xl font-bold text-gray-800 lg:text-4xl">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-chocolate lg:text-3xl">
                Ksh {product.price.toLocaleString()}
              </span>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Availability:</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">In Stock</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Delivery:</span>
                <span className="text-sm text-gray-500">2-3 Business Days</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 text-sm font-medium text-gray-800">Quantity</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-chocolate hover:text-white"
                >
                  <FiMinus size={18} />
                </button>
                <span className="w-8 text-center text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-chocolate hover:text-white"
                >
                  <FiPlus size={18} />
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="mt-auto w-full rounded-xl bg-chocolate py-4 text-white transition hover:bg-chocolate/90"
            >
              Add to Cart - Ksh {(product.price * quantity).toLocaleString()}
            </button>
          </div>
        </motion.div>

        {/* Description and Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100"
        >
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="font-DreamToBerich text-2xl font-bold text-gray-800">
                About This Cake
              </h2>
              <p className="leading-relaxed text-gray-600">
                {product.description}
              </p>
              <div className="space-y-2 pt-4">
                <h3 className="font-medium text-gray-800">Perfect For:</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-600">
                  <li>Birthday Celebrations</li>
                  <li>Special Occasions</li>
                  <li>Corporate Events</li>
                  <li>Wedding Ceremonies</li>
                </ul>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              <h2 className="font-DreamToBerich text-2xl font-bold text-gray-800">
                Premium Ingredients
              </h2>
              <p className="text-gray-600">
                We use only the finest ingredients to ensure exceptional taste and quality in every bite.
              </p>
              <ul className="grid gap-3 pt-4">
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-chocolate"></span>
                  Premium Belgian Chocolate
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-chocolate"></span>
                  Farm-Fresh Eggs
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-chocolate"></span>
                  Pure Madagascar Vanilla
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-chocolate"></span>
                  Organic Heavy Cream
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-chocolate"></span>
                  Natural Food Colors
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
