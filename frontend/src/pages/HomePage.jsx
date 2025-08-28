import CategoryItem from "../components/CategoryItem";
import { motion } from "framer-motion";
import SalesBanner from "../components/SalesBanner";
import Slider from "../components/Slider";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import PromoVideo from "../components/PromoVideo";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.avif" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.avif" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.avif" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.avif" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.avif" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.avif" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.avif" },
];

function HomePage() {
  return (
    <>
      <Hero />
      <section id="categories" className="relative bg-white text-gray-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-3">
            Explore Categories
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10">
            Discover the latest trends and styles for men and women.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, i) => (
              <CategoryItem category={category} key={category.name} index={i} />
            ))}
          </div>
        </div>
      </section>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Slider />
      </div>
      <SalesBanner />
      <Features />
      <PromoVideo />
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default HomePage;
