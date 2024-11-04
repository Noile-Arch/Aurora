import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import Footer from "../components/Footer";

interface PageLayoutProps {
  children?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-auto flex flex-col justify-start">
      <Navbar />
      <div>
        {children ? children : <Outlet />}
      </div>
      <Footer/>
    </div>
  );
};

export default PageLayout;
