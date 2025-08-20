import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.avif" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.avif" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.avif" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.avif" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.avif" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.avif" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.avif" },
];
import { motion } from "framer-motion";
import SalesBanner from "../components/SalesBanner";
function HomePage() {
  return (
    <>
      <div className="relative min-h-screen text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-center text-5xl sm:text-6xl font-bold text-amber-700 mb-4 ">
            Explore the Categ{" "}
            <motion.span
              className="text-7xl text-white font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              .
            </motion.span>
          </h1>
          <p className="text-center text-xl text-black mb-12">
            Discover the lastest trends and styles for men and women
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, i) => (
              <CategoryItem category={category} key={category.name} index={i} />
            ))}
          </div>
        </div>
      </div>
      <SalesBanner />
    </>
  );
}

export default HomePage;
