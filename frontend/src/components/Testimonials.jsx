import { Quote } from "lucide-react";

const testimonials = [
	{
		quote:
			"Absolutely love the quality and fit. Shipping was super fast, too!",
		name: "Ava Johnson",
		role: "Creative Director",
	},
	{
		quote: "Stylish and comfortable. My go-to store for essentials.",
		name: "Marcus Lee",
		role: "Product Manager",
	},
	{
		quote: "Great prices and amazing customer support. Highly recommend!",
		name: "Sofia Martinez",
		role: "Photographer",
	},
];

function Testimonials() {
	return (
		<section className="py-20 bg-gradient-to-b from-white to-amber-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
					What our customers say
				</h2>
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					{testimonials.map((t) => (
						<figure key={t.name} className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
							<Quote className="text-amber-500" />
							<blockquote className="mt-4 text-gray-700">{t.quote}</blockquote>
							<figcaption className="mt-4">
								<div className="text-sm font-semibold text-gray-900">{t.name}</div>
								<div className="text-xs text-gray-500">{t.role}</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}

export default Testimonials; 