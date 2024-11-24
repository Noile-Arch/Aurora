import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainLayout from "./layouts/MainLayout";
import { ProtectedRoute } from "./access/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import ProfileInfo from "./components/profile/ProfileInfo";
import Notifications from "./components/profile/Notifications";
import Favourites from "./components/profile/Favourites";
import OrderHistory from "./components/profile/OrderHistory";
import ContactUs from "./components/home/ContactUs";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import AddPastry from "./pages/admin/AddPastry";
import Basket from "./pages/views/Basket";
import AdminRoute from "./access/AdminRoute";
import Cakes from "./pages/Cakes";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/views/Checkout";
import PaymentStatus from "./pages/views/PaymentStatus";
import Payments from "./pages/admin/Payments";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes - no protection or layout */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-pastry" element={<AddPastry />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>

        {/* Protected routes with MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LandingPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cakes"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cakes />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AboutUs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ContactUs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Basket />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile routes nested under protection */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/profile/profile-info" element={<ProfileInfo />} />
          <Route path="/profile/notifications" element={<Notifications />} />
          <Route path="/profile/favourites" element={<Favourites />} />
          <Route path="/profile/order-history" element={<OrderHistory />} />
        </Route>

        <Route path="/payment-status/:orderId" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
