import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 500; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-DreamToBerich text-3xl font-bold text-gray-800">
          Shopping Cart
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-white p-4 shadow-md ring-1 ring-gray-100"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-chocolate">
                        Ksh {item.price.toLocaleString()}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {cartItems.length === 0 && (
                <div className="flex justify-center items-center w-screen h-[400px] ">
                  <div className="rounded-xl bg-white p-8 text-center shadow-md md:w-[500px] md:h-[200px] flex flex-col items-center justify-center">
                    <p className="text-gray-600">Your cart is empty</p>
                    <button
                      onClick={() => navigate("/cakes")}
                      className="mt-4 text-chocolate hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Card */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-fit rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100"
            >
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Ksh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Ksh {shipping.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>Ksh {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')} 
                className="mt-6 w-full rounded-xl bg-chocolate py-3 font-medium text-white transition hover:bg-chocolate/90"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
