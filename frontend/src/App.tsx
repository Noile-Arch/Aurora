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
import Basket from "./pages/views/Basket";


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes - no protection or layout */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

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
      </Routes>
    </Router>
  );
}

export default App;
