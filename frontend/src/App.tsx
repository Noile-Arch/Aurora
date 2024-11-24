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
import Basket from "./pages/views/Basket";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Basket />} />
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
