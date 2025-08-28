import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/Slide-1.png",
    title: "Summer Essentials",
    subtitle: "Breathe easy in lightweight layers and relaxed fits.",
    ctaText: "Shop Now",
    ctaHref: "/categories",
  },
  {
    image: "/Slide-2.avif",
    title: "Urban Streetwear",
    subtitle: "Bold silhouettes, everyday comfort.",
    ctaText: "Explore Collection",
    ctaHref: "/categories",
  },
  {
    image: "/Slide-3.avif",
    title: "Minimal Classics",
    subtitle: "Timeless pieces that go with everything.",
    ctaText: "Discover",
    ctaHref: "/categories",
  },
  {
    image: "/Slide-4.avif",
    title: "Statement Outerwear",
    subtitle: "Layer up with texture and color.",
    ctaText: "Find Your Style",
    ctaHref: "/categories",
  },
];

function Slider() {
  return (
    <div className="relative">
      <Splide
        aria-label="Featured Collections"
        options={{
          type: "loop",
          autoplay: true,
          interval: 4000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
          speed: 1000,
          rewind: true,
          gap: "1.5rem",
          keyboard: "global",
          classes: {
            arrows: "splide__arrows !opacity-95",
            arrow:
              "splide__arrow bg-white/40 hover:bg-white/70 text-gray-800 rounded-full backdrop-blur-md transition shadow-md",
            pagination: "splide__pagination splide__pagination--ltr",
            page: "splide__pagination__page !bg-white/40 [&.is-active]:!bg-white",
          },
        }}
      >
        {slides.map((s, idx) => (
          <SplideSlide key={idx}>
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] overflow-hidden rounded-3xl shadow-lg">
              {/* Background Image */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />

              {/* Floating Card Content */}
              <motion.div
                className="relative z-10 h-full flex items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="ml-6 sm:ml-12 bg-white/20 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl max-w-xl">
                  <motion.h3
                    className="text-white text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {s.title}
                  </motion.h3>
                  <motion.p
                    className="mt-3 text-white/90 text-base sm:text-lg lg:text-xl"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    {s.subtitle}
                  </motion.p>
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Link
                      to={s.ctaHref}
                      className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-3 text-white font-semibold shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition-all"
                    >
                      {s.ctaText}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Slider;
