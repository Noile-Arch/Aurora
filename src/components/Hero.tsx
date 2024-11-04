import HeroCarousel from "./carousels/HeroCarousel";

const Hero = () => {
  return (
    <section className="h-screen w-full hero">
      <div className="w-full h-full bg-black/60">
        <HeroCarousel />
      </div>
    </section>
  );
};

export default Hero;
