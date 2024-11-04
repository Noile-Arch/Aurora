import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "../../data/mydata";

const IndividualCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    arrows: false,
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
          slidesToShow: 1,
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
    <div className="slider-container text-white w-full h-full relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-[250px] h-[400px] relative p-4">
            <img
              className={`w-full h-full object-cover object-left rounded-t-lg ${
                slide.mirror ? "scale-x-[-1]" : ""
              }`}
              src={slide.imageUrl}
              alt={slide.alt}
            />
            <div className="w-full h-full absolute inset-0 flex justify-center items-end py-10 bg-gradient-to-b from-transparent from-70% to-80% to-black/80">
              <h1 className="font-['DreamToBerich'] text-sm">{slide.title}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default IndividualCarousel;
