import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
<<<<<<< HEAD
import Dashboard from "./pages/admin/Dashboard";
import AddPastry from "./pages/admin/AddPastry";
=======
import Basket from "./pages/views/Basket";

>>>>>>> 9d00fb7bd430ad679d548937a611c40a4b6d80e8

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
<<<<<<< HEAD
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-pastry" element={<AddPastry />} />
=======
          <Route path="/cart" element={<Basket />} />
>>>>>>> 9d00fb7bd430ad679d548937a611c40a4b6d80e8
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/profile-info" element={<ProfileInfo />} />
            <Route path="/profile/notifications" element={<Notifications />} />
            <Route path="/profile/favourites" element={<Favourites />} />
            <Route path="/profile/order-history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
