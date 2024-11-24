import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdAddCircle,
  MdShoppingCart,
  MdPayment,
  MdPeople,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { useAuth } from "../../hooks/use/user";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard size={24} />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Pastry",
      icon: <MdAddCircle size={24} />,
      path: "/admin/add-pastry",
    },
    {
      name: "Orders",
      icon: <MdShoppingCart size={24} />,
      path: "/admin/orders",
    },
    {
      name: "Payments",
      icon: <MdPayment size={24} />,
      path: "/admin/payments",
    },
    { name: "Users", icon: <MdPeople size={24} />, path: "/admin/users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auroraAuth");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-white">
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-chocolate text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex h-18 items-center justify-center">
          <img src={"/Logo.png"} alt="" className="size-24 rounded-full" />
        </div>

        {/* Navigation Menu */}
        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`mb-1 flex cursor-pointer items-center rounded-lg px-4 py-2 transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-purple-100 hover:bg-primary"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="mt-8 flex cursor-pointer items-center rounded-lg px-4 py-2 text-purple-100 hover:bg-primary"
          >
            <MdLogout size={24} className="mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <MdMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://ui-avatars.com/api/?name=Admin+User"
                alt="Admin"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
