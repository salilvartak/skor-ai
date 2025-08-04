import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Gem } from "lucide-react";

const featuredTournaments = [
  {
    id: 1,
    title: "VCT PACIFIC",
    status: "live",
    img: "/assets/vct.jpg", // replace with real image path
    cta: "Watch Live",
  },
  {
    id: 2,
    title: "Esports World Cup",
    status: "upcoming",
    img: "/assets/ewc.jpg",
    cta: "Join Tournament",
  },
];

const FeaturedCarousel: React.FC = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  return (
    <section className="mb-16">
      {/* Section Title */}
      <div className="flex items-center mb-6">
        <Gem className="w-6 h-6 text-[#EE5946] mr-3" />
        <h2 className="text-2xl font-bold text-white">Featured & Recommended</h2>
        <div className="ml-4 px-3 py-1 bg-[#EE5946]/20 border border-[#EE5946]/30 rounded-full">
          <span className="text-[#EE5946] text-sm font-medium">Highlight</span>
        </div>
      </div>

      {/* Neon Frame */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EE5946]/10 to-blue-500/10 rounded-3xl blur-xl"></div>

        <div className="relative bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">
          <div ref={sliderRef} className="keen-slider rounded-3xl">
            {featuredTournaments.map((item) => (
              <div key={item.id} className="keen-slider__slide">
                <div className="relative flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group cursor-pointer">

                  {/* Left Image Side */}
                  <div className="md:w-3/4 w-full h-60 md:h-80 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Right Info Side */}
                  <div className="md:w-1/4 w-full p-6 flex flex-col justify-between bg-black/50 relative">
                    {/* LIVE tag */}
                    {item.status === "live" && (
                      <span className="absolute top-4 right-4 text-red-500 text-xs font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    )}

                    <div className="mt-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                    </div>

                    <button className="mt-auto bg-gradient-to-r from-[#EE5946] to-red-600 hover:from-red-600 hover:to-[#EE5946] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                      {item.cta}
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#EE5946]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="text-white hover:text-[#EE5946] text-xl px-2"
            >
              ←
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="text-white hover:text-[#EE5946] text-xl px-2"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
