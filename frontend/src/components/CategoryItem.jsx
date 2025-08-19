import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category, index }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-[400px] w-full rounded-md group"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.8,
        delay: index * 0.3, // Stagger based on index
      }}
    >
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer rounded-lg border border-gray-700 p-3">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <motion.img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-lg"
            loading="lazy"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">
              {category.name}
            </h3>
            <p className="text-gray-200 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;
