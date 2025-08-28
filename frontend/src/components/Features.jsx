import { ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";

const features = [
	{
		icon: ShieldCheck,
		title: "Secure Payments",
		description: "Encrypted checkout with top-tier fraud protection.",
	},
	{ icon: Truck, title: "Fast Delivery", description: "Express shipping on all orders." },
	{ icon: RefreshCw, title: "Easy Returns", description: "30-day hassle-free returns." },
	{ icon: Sparkles, title: "Premium Quality", description: "Handpicked items from top brands." },
];

function Features() {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
					Why shop with us
				</h2>
				<p className="mt-3 text-gray-600 text-center max-w-2xl mx-auto">
					Everything you need for a seamless shopping experience.
				</p>

				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map(({ icon: Icon, title, description }) => (
						<div
							key={title}
							className="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow bg-white"
						>
							<div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-100 text-amber-700">
								<Icon size={24} />
							</div>
							<h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
							<p className="mt-2 text-sm text-gray-600">{description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Features; 