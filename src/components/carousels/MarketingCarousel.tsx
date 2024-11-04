import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "../../data/mydata";

const MarketingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    arrows: false,
  };

  return (
    <div className="slider-container text-white w-full h-full relative ">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full lg:mx-60 h-[500px] flex justify-center items-center relative  "
          >
            <img
              className={`lg:w-[1000px] w-full h-full object-cover object-center rounded-[20px]  + ${
                slide.mirror
                  ? "scale-x-[-1]"
                  : "lg:w-[1000px] w-full h-full object-cover object-center "
              }`}
              src={slide.imageUrl}
              alt={slide.alt}
            />
            <div className="xl:w-[50%] w-full rounded-l-[20px] bg-gradient-to-r from-black/80 from-70% to-100% to-transparent flex flex-col justify-center items-start lg:px-20 h-full absolute inset-0 px-4">
              <h1 className="font-['DreamToBerich'] text-white lg:text-2xl text-lg gap-7 flex flex-col px-4">
                Artisan Cakes for <br />
                <span className="lg:text-6xl md:text-[5xl] text-3xl">
                  Happiness
                </span>
              </h1>
              <p className="font-sans lg:w-[50%] sm:w-[70%] py-6 px-4">
                Discover our deliciously crafted cakes made with the finest
                ingredients. Perfect for any occasion, our treats will satisfy
                every craving. Celebrate every moment with a sweet delight!
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MarketingCarousel;
