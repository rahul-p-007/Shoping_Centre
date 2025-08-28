import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
	return (
		<section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-amber-50 to-white">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
				<div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				<motion.h1
					className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
				>
					Refresh your wardrobe
					<motion.span
						className="block bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						with styles that move.
					</motion.span>
				</motion.h1>

				<motion.p
					className="mt-6 max-w-2xl mx-auto text-center text-lg sm:text-xl text-gray-600"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					Discover curated pieces for every occasion — casual, formal, and everything in between.
				</motion.p>

				<motion.div
					className="mt-10 flex items-center justify-center gap-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.6 }}
				>
					<Link
						to="/"
						className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 text-white font-semibold shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition-colors"
					>
						Shop New Arrivals
					</Link>
					<a
						href="#categories"
						className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
					>
						Browse Categories
					</a>
				</motion.div>
			</div>
		</section>
	);
}

export default Hero; 