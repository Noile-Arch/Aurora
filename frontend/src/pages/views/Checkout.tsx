import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import api from "../../hooks/axios";
import { AxiosError, AxiosResponse } from "axios";

type CartItem = {
  id: string;
  name: string;
  price: number;
  type: string;
  description: string;
  image: string;
  quantity: number;
};

// Add interface for API error response
interface ApiErrorResponse {
  message: string;
  data?: {
    orderId?: string;
    status?: string;
    error?: string;
  };
}

// Update the PaymentError interface
interface PaymentError extends AxiosError<ApiErrorResponse> {
  response?: AxiosResponse<ApiErrorResponse>; // Use AxiosResponse instead of custom shape
}

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const total =
        cartItems.reduce(
          (sum: number, item: CartItem) => sum + item.price * item.quantity,
          0
        ) + 500;

      // If there's a failed order, try to reuse it
      let orderId = currentOrderId;

      if (!orderId) {
        // Create new order only if there isn't an existing one
        const orderResponse = await api.post("/orders", {
          items: cartItems.map((item: CartItem) => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          deliveryAddress: {
            postalCode: formData.email,
          },
          phoneNumber: "254" + formData.phoneNumber.replace(/^\+?254?0?/, ""),
          specialInstructions: "",
          status: "pending_payment",
        });

        if (!orderResponse.data.data.order._id) {
          throw new Error("Order ID not received");
        }

        orderId = orderResponse.data.data.order._id;
        setCurrentOrderId(orderId);
      }

      // Initiate payment with better error handling
      try {
        const paymentResponse = await api.post("/payments/simulate", {
          phoneNumber: "254" + formData.phoneNumber.replace(/^\+?254?0?/, ""),
          amount: total,
          orderId: orderId,
        });

        if (paymentResponse.data.status === "success") {
          toast.success(
            "Please check your phone for the STK push notification",
            {
              duration: 5000,
            }
          );
          navigate(`/payment-status/${orderId}`);
        }
      } catch (paymentError: unknown) {
        const error = paymentError as PaymentError;
        console.error("Payment Error Details:", {
          response: error.response?.data,
          status: error.response?.status,
          message: error.message,
        });

        setError(
          error.response?.data?.message ||
            "Failed to initiate payment. Please try again."
        );

        // Cancel the order if payment initiation fails
        if (orderId) {
          await api.post(`/orders/${orderId}/cancel`).catch(console.error);
          setCurrentOrderId(null);
        }
      }
    } catch (error: unknown) {
      const err = error as PaymentError;
      console.error("Order Error:", err);
      setError(err.response?.data?.message || "Failed to process order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100"
          >
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-DreamToBerich text-3xl font-bold text-gray-800">
                Checkout
              </h1>
              <p className="text-gray-600">Complete your order using M-Pesa</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  P.O Box
                </label>
                <input
                  type="text"
                  required
                  placeholder="P.O Box 00100-1234"
                  className="w-full rounded-lg border bg-white border-gray-300 p-2.5 focus:border-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/20"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    +254
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{9}"
                    placeholder="7XXXXXXXX"
                    className="w-full rounded-lg border bg-white border-gray-300 p-2.5 pl-16 focus:border-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/20"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your M-Pesa registered phone number
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Ksh{" "}
                    {JSON.parse(localStorage.getItem("cart") || "[]")
                      .reduce(
                        (sum: number, item: CartItem) =>
                          sum + item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Ksh 500</span>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Total</span>
                    <span className="font-bold text-chocolate">
                      Ksh{" "}
                      {(
                        JSON.parse(localStorage.getItem("cart") || "[]").reduce(
                          (sum: number, item: CartItem) =>
                            sum + item.price * item.quantity,
                          0
                        ) + 500
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-500">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-xl py-4 font-medium text-white transition ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-chocolate hover:bg-chocolate/90"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  "Pay with M-Pesa"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full text-sm text-gray-500 hover:text-chocolate"
              >
                Return to Cart
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
