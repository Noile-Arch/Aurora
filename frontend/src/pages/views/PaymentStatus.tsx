import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../hooks/axios";

interface PaymentStatus {
  status: "pending" | "completed" | "failed";
  message: string;
  receiptNumber?: string;
}

const PaymentStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PaymentStatus>({
    status: "pending",
    message: "Processing your payment...",
  });

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await api.get(`/payments/status/${orderId}`);
        setStatus(response.data);

        if (response.data.status === "completed") {
          // Clear cart after successful payment
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.log(error);
        setStatus({
          status: "failed",
          message: "Failed to process payment. Please try again.",
        });
      }
    };

    const interval = setInterval(checkPaymentStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        {status.status === "pending" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-chocolate border-t-transparent"></div>
            </div>
            <h2 className="mb-2 font-DreamToBerich text-2xl font-bold text-gray-800">
              Processing Payment
            </h2>
            <p className="text-gray-600">
              Please complete the payment on your phone...
            </p>
          </div>
        )}

        {status.status === "completed" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 font-DreamToBerich text-2xl font-bold text-gray-800">
              Payment Successful!
            </h2>
            <p className="mb-4 text-gray-600">
              Thank you for your order. Your transaction was successful.
            </p>
            {status.receiptNumber && (
              <p className="mb-4 text-sm text-gray-500">
                Receipt Number: {status.receiptNumber}
              </p>
            )}
            <button
              onClick={() => navigate("/cakes")}
              className="w-full rounded-xl bg-chocolate py-3 text-white transition hover:bg-chocolate/90"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {status.status === "failed" && (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 font-DreamToBerich text-2xl font-bold text-gray-800">
              Payment Failed
            </h2>
            <p className="mb-4 text-gray-600">{status.message}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full rounded-xl bg-chocolate py-3 text-white transition hover:bg-chocolate/90"
            >
              Try Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
