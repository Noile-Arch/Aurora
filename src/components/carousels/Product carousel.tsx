import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { slides } from "../../data/mydata";
import ProductCard from "../shared/ProductCard";
const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "ease-in-out",
    arrows: false,
    afterChange: (current: number) => setCurrentIndex(current),
    responsive: [
      {
        breakpoint: 1024, // Tablet and above
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Very small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container text-white w-full h-full relative py-4">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <ProductCard slide={slide} key={slide.id} />
        ))}
      </Slider>

      {/* Custom counter with clickable arrows */}
      <div className="lg:top-4 mt-10 flex text-black justify-center items-center gap-4 w-full px-4 py-2 rounded-lg">
        <span
          onClick={() => sliderRef.current?.slickPrev()}
          className="cursor-pointer px-1 text-xl p-1 rounded-full border border-gray-400"
        >
          <FaChevronLeft />
        </span>
        {` ${currentIndex + 1} / ${slides.length} `}
        <span
          onClick={() => sliderRef.current?.slickNext()}
          className="cursor-pointer px-1 text-xl p-1 rounded-full border border-gray-400"
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default ProductCarousel;
