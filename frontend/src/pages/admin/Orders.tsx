import { useEffect, useState } from "react";
import Layout from "./Layout";
import { MdCheckCircle, MdCancel, MdPending } from "react-icons/md";

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  items: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  payment: {
    status: string;
    mpesaReceiptNumber?: string;
  };
  createdAt: string;
  deliveryAddress: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  phoneNumber: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("auroraAuth");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/all`,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("auroraAuth");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) throw new Error("Failed to update order status");

      // Refresh orders after update
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
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
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.user.name}</p>
                        <p className="text-sm text-gray-500">{order.phoneNumber}</p>
                        <p className="text-xs text-gray-400">
                          {order.deliveryAddress ? 
                            `${order.deliveryAddress.street || ''}, 
                             ${order.deliveryAddress.city || ''} 
                             ${order.deliveryAddress.postalCode || ''}`.trim() 
                            : 'No address provided'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-h-20 overflow-y-auto">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.quantity}x {item.product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      Ksh {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            order.payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.payment.status}
                        </span>
                        {order.payment.mpesaReceiptNumber && (
                          <p className="mt-1 text-xs text-gray-500">
                            {order.payment.mpesaReceiptNumber}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateOrderStatus(order._id, "completed")}
                          className="text-green-600 hover:text-green-900"
                          title="Mark as Completed"
                        >
                          <MdCheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, "processing")}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Mark as Processing"
                        >
                          <MdPending size={20} />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, "cancelled")}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel Order"
                        >
                          <MdCancel size={20} />
                        </button>
                      </div>
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