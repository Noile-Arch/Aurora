import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "../../data/mydata"; // Make sure your slides array is correctly imported
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
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
        right: "-50px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      ➔
    </div>
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
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
        left: "-50px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      ←
    </div>
  );
}

const DesertCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet and above
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Very small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container text-white w-full h-full relative lg:py-10 py-4 lg:px-4">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="lg:w-[300px] w-[300px]  h-[450px] relative px-4"
          >
            <img
              className={`w-full h-full object-cover object-left rounded-[20px] ${
                slide.mirror ? "scale-x-[-1]" : ""
              }`}
              src={slide.imageUrl}
              alt={slide.alt}
            />
            <div className="w-full px-4 flex flex-col justify-end items-center h-full absolute inset-0">
              <div className="bg-chocolate font-['DreamToBerich'] w-full h-20 flex justify-center items-center">
                <h1>{slide.title}</h1>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DesertCarousel;
