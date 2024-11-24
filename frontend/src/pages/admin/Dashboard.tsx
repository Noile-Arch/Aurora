import { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdShoppingCart,
  MdInventory,
  MdTrendingUp,
  MdEdit,
  MdDelete,
  MdAdd,
} from "react-icons/md";
import Layout from "./Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  recentPayments: Payment[];
  recentOrders: Order[];
  salesData: SalesData[];
  products: Product[];
}

interface Payment {
  _id: string;
  mpesaReceiptNumber: string;
  amount: number;
  transactionDate: string;
  status: "success" | "failed";
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  payment: {
    status: string;
    mpesaReceiptNumber?: string;
  };
}

interface SalesData {
  date: string;
  amount: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  stockQuantity: number;
  image: string;
}

// Add default empty arrays for recentPayments and recentOrders
const defaultMetrics: DashboardMetrics = {
  totalOrders: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  completedOrders: 0,
  totalProducts: 0,
  recentPayments: [],
  recentOrders: [],
  salesData: [],
  products: [],
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("auroraAuth");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setMetrics(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("auroraAuth");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh dashboard data after deletion
      fetchDashboardData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
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
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Orders */}
          <div className="rounded-lg bg-blue-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Orders</p>
                <p className="text-3xl font-bold">{metrics?.totalOrders}</p>
              </div>
              <MdShoppingCart size={40} className="opacity-80" />
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-lg bg-green-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Revenue</p>
                <p className="text-3xl font-bold">
                  Ksh {metrics?.totalRevenue?.toLocaleString() ?? 0}
                </p>
              </div>
              <MdAttachMoney size={40} className="opacity-80" />
            </div>
          </div>

          {/* Pending Orders */}
          <div className="rounded-lg bg-yellow-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Pending Orders</p>
                <p className="text-3xl font-bold">{metrics?.pendingOrders}</p>
              </div>
              <MdTrendingUp size={40} className="opacity-80" />
            </div>
          </div>

          {/* Products */}
          <div className="rounded-lg bg-purple-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Products</p>
                <p className="text-3xl font-bold">{metrics?.totalProducts}</p>
              </div>
              <MdInventory size={40} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Sales Overview
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products Section */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Your Products
            </h3>
            <Link
              to="/admin/add-pastry"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-chocolate"
            >
              <MdAdd size={20} />
              Add New Product
            </Link>
           
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(metrics?.products || []).map((product) => (
                  <tr key={product._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={
                           `${import.meta.env.VITE_API_BACKEND_URL}${product.image}`
                          }
                          alt={product.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="ml-4">{product.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">
                          {product.category}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.subCategory}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      Ksh {product.price.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.stockQuantity > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <MdEdit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {metrics?.products?.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Payments */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Recent Payments
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Receipt No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
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
                  {(metrics?.recentPayments || []).map((payment) => (
                    <tr key={payment._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {payment.mpesaReceiptNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        Ksh {payment.amount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(payment.transactionDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            payment.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {metrics?.recentPayments?.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No recent payments
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(metrics?.recentOrders || []).map((order) => (
                    <tr key={order._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {order._id.slice(-6)}
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
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            order.payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {metrics?.recentOrders?.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No recent orders
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
