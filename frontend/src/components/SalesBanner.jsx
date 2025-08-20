import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const SalesBanner = () => {
  const bannerText = "SALES 20% OFF";
  const itemsCount = 8; // More items for smoother marquee

  const marqueeTransition = {
    ease: "linear",
    duration: 25, // Adjust speed
    repeat: Infinity,
  };

  const BannerItem = () => (
    <span className="mx-8 flex items-center">
      <Tag className="mr-3 h-5 w-5 md:h-6 md:w-6" />
      {bannerText}
    </span>
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 py-4 shadow-xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap text-lg md:text-xl font-extrabold uppercase tracking-widest text-white"
            animate={{ x: ["0%", "-100%"] }} // <-- Infinite loop
            transition={marqueeTransition}
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
          >
            {/* Render content twice for seamless loop */}
            <div className="flex">
              {Array.from({ length: itemsCount }).map((_, i) => (
                <BannerItem key={`item1-${i}`} />
              ))}
            </div>
            <div className="flex" aria-hidden="true">
              {Array.from({ length: itemsCount }).map((_, i) => (
                <BannerItem key={`item2-${i}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalesBanner;
