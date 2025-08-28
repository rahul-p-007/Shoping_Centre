import { useMemo, useState } from "react";
import CategoryItem from "../components/CategoryItem";

const ALL_CATEGORIES = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.avif" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.avif" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.avif" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.avif" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.avif" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.avif" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.avif" },
];

function ExploreCategoriesPage() {
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return ALL_CATEGORIES;
		return ALL_CATEGORIES.filter((c) => c.name.toLowerCase().includes(q));
	}, [query]);

	return (
		<div className="relative bg-white">
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
					<div>
						<h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
							Explore Categories
						</h1>
						<p className="mt-2 text-gray-600">
							Browse our curated categories and find your next favorite fit.
						</p>
					</div>
					<div className="w-full sm:w-80">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Search categories
						</label>
						<input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder='Try "Jeans" or "Shoes"'
  aria-label="Search categories"
  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
/>

					</div>
				</header>

				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{filtered.map((category, i) => (
						<CategoryItem key={category.name} category={category} index={i} />
					))}
				</div>
				{filtered.length === 0 && (
					<p className="mt-8 text-gray-500">No categories match your search.</p>
				)}
			</section>
		</div>
	);
}

export default ExploreCategoriesPage;
