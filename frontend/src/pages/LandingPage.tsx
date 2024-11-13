import Advantage from "../components/home/Advantage";
import DesertCarousel from "../components/carousels/DesertCarousel";
import Hero from "../components/home/Hero";
import TrustUs from "../components/home/TrustUs";
import PageLayout from "./PageLayout";
import Menu from "../components/home/Menu";
import Info from "../components/home/Info";
import FollowUs from "../components/home/FollowUs";
import ContactUs from "../components/home/ContactUs";

const LandingPage = () => {
  return (
    <PageLayout>
      <section className="w-full lg:h-[700px]">
        <Hero />
      </section>
      <section className="w-full lg:h-[600px] py-3 flex flex-col justify-start items-center " id="assortment">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">
          Explore
        </h1>
        <p className="text-3xl py-4 font-['DreamToBerich']">Assortment</p>
        <div className="w-full h-full">
          <DesertCarousel />
        </div>
      </section>
      <section className="w-full lg:h-[600px] py-3 flex flex-col justify-start items-center " id="about-us">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">
          About Us
        </h1>
        <p className="text-3xl py-4 font-['DreamToBerich']">Who We Are</p>
        <div className="w-full h-full">
          <TrustUs />
        </div>
      </section>
      <section className="w-full lg:h-[600px] mt-20 py-10 flex flex-col justify-start items-center " id="advantage">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">Our</h1>
        <p className="text-3xl py-4 font-['DreamToBerich']">Best Advantage</p>
        <div className="w-full h-full" >
          <Advantage />
        </div>
      </section>
      <section className="w-full h-auto py-10 flex flex-col justify-start items-center " id="menu">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">Our</h1>
        <p className="text-3xl py-4 font-['DreamToBerich']"> Delicious Menu</p>
        <div className="w-full h-full" >
          <Menu />
        </div>
      </section>
      <section className="w-full lg:h-[650px] py-3 flex flex-col justify-start items-center " id="info">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">
          What Our
        </h1>
        <p className="text-3xl py-4 font-['DreamToBerich']"> Client Say</p>
        <div className="w-full h-full" >
          <Info />
        </div>
      </section>
      <section className="w-full lg:h-[400px] py-3 flex flex-col justify-start items-center " id="follow-us">
        <div className="w-full h-full " >
          <FollowUs />
        </div>
      </section>
      <section className="w-full py-10 flex flex-col justify-start items-center " id="contact-us">
        <h1 className="text-lg font-['DreamToBerich'] text-chocolate">
          Contact Us
        </h1>
        <p className="text-3xl py-4 font-['DreamToBerich']"> Get in touch</p>
        <div className="w-full h-full" >
          <ContactUs />
        </div>
      </section>
    </PageLayout>
  );
};

export default LandingPage;
