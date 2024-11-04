import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "../../data/mydata";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`slick-arrow ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#a80000",
        color: "white",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      ➔
    </div>
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`slick-arrow ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#a80000",
        color: "blue",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      ←
    </div>
  );
}

const HeroCarousel = () => {


  const sliderRef = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false, // Disable default dots
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current: number) => setCurrentIndex(current), // Update index on slide change
  };

  return (
    <div className="slider-container text-white w-full h-screen min-h-screen relative">
      {/* Custom Dots Wrapper */}
      <div className="absolute inset-0 h-full w-full flex justify-center items-end pb-10 z-10">
        {slides.map((_, dotIndex) => (
          <div
            key={dotIndex}
            className={`w-2 h-2 rounded-full cursor-pointer mx-1 ${
              currentIndex === dotIndex ? "bg-chocolate" : "bg-gray-400"
            }`}
            onClick={() => sliderRef.current?.slickGoTo(dotIndex)} // Navigate to slide
          />
        ))}
      </div>

      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-screen relative">
            <img
              className={`w-full h-full object-cover object-center ${
                slide.mirror ? "scale-x-[-1]" : ""
              }`}
              src={slide.imageUrl}
              alt={slide.alt}
            />
            <div className="w-full flex lg:px-60 sm:px-[100px] px-[70px] flex-col justify-center items-start h-full absolute inset-0 bg-gradient-to-r from-black/90 from-20% to-transparent to-80%">
              <h1 className="font-['DreamToBerich'] text-white lg:text-2xl text-lg gap-7 flex flex-col">
                Artisan Cakes for <br />
                <span className="lg:text-7xl text-4xl sm:text-5xl">Happiness</span>
              </h1>
              <p className="font-sans lg:w-[50%] sm:w-[70%] text-lg py-6">
                Discover our deliciously crafted cakes made with the finest ingredients. Perfect for any occasion, our treats will satisfy every craving. Celebrate every moment with a sweet delight!
              </p>
              <button className="px-8 py-3 mt-4 bg-chocolate text-white font-sans rounded-lg">
                Order Now!
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
