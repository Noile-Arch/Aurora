import Hero from "../components/Hero";
import TrustUs from "../components/TrustUs";
import DesertCarousel from "../components/carousels/DesertCarousel";
import IndividualCarousel from "../components/carousels/IndividualCarousel";
import MarketingCarousel from "../components/carousels/MarketingCarousel";
import ProductCarousel from "../components/carousels/Product carousel";
import PageLayout from "./PageLayout";

const HomePage = () => {
  return (
    <PageLayout>
      {/* <div className="w-full h-20 absolute inset-0">
        <Navbar />
      </div> */}
      <section className="font-['DreamToBerich']">
        <Hero />
      </section>
      <section className="md:h-screen h-auto w-full py-10 bg-white">
        <div className="w-full h-full flex flex-col justify-start items-center lg:p-4">
          <h1 className="font-['DreamToBerich'] p-4 text-chocolate text-3xl">
            Popular Deserts
          </h1>
          <div className="w-full flex-1 lg:px-10 px-4">
            <DesertCarousel />
          </div>
        </div>
      </section>
      <section className="md:h-screen h-full w-full  bg-white">
        <div className="w-full h-full flex flex-col justify-start items-center lg:p-4">
          <h1 className="font-['DreamToBerich'] lg:p-4 text-chocolate text-3xl">
            All Products
          </h1>
          <div className="w-full flex-1 lg:px-20 px-4 lg:py-10 py-4">
            <ProductCarousel />
          </div>
        </div>
      </section>
      <section className="h-[580px] w-full bg-white">
        <div className="w-full h-full flex flex-col justify-start items-center p-4 ">
          <div className="w-full flex justify-center items-center">
            <MarketingCarousel />
          </div>
        </div>
      </section>
      <section className="h-[500px] w-full bg-white">
        <div className="w-full h-full flex flex-col justify-start items-center">
          <h1 className="font-['DreamToBerich'] p-4 text-chocolate lg:text-3xl text-2xl">
            Individual cakes
          </h1>
          <div className="w-full flex-1">
            <IndividualCarousel />
          </div>
        </div>
      </section>
      <section className="h-[400px] md:h-[500px] w-full bg-white py-10">
        <div className="w-full h-full flex flex-col justify-start items-center">
          <h1 className="font-['DreamToBerich'] p-4 text-chocolate lg:text-3xl text-2xl">
            Why Trust Us
          </h1>
          <div className="w-full h-full text-white">
            <TrustUs />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
