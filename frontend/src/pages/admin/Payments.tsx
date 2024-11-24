import { useEffect, useState } from "react";
import Layout from "./Layout";
// import { MdCheckCircle, MdCancel } from "react-icons/md";

interface Payment {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  order: {
    _id: string;
    totalAmount: number;
  };
  amount: number;
  mpesaReceiptNumber: string;
  transactionDate: string;
  status: "success" | "failed" | "pending";
  phoneNumber: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("auroraAuth");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payments/logs`,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch payments");

      const data = await response.json();
      setPayments(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Payment Management</h2>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    M-Pesa Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {payment._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{payment.user.name}</p>
                        <p className="text-sm text-gray-500">{payment.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      Ksh {payment.amount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {payment.mpesaReceiptNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(payment.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}