import { useState } from "react";

function Newsletter() {
	const [email, setEmail] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		// For now, just clear the input. Hook to backend later.
		setEmail("");
	};

	return (
		<section className="py-16 bg-white">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
					Stay in the loop
				</h3>
				<p className="mt-2 text-gray-600">
					Sign up to receive exclusive offers, new arrivals, and more.
				</p>
				<form onSubmit={onSubmit} className="mt-8 flex gap-3 max-w-xl mx-auto">
					<input
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
					/>
					<button
						type="submit"
						className="rounded-lg bg-amber-600 text-white px-6 py-3 font-semibold hover:bg-amber-700"
					>
						Subscribe
					</button>
				</form>
				<p className="mt-3 text-xs text-gray-500">
					We care about your data in our privacy policy.
				</p>
			</div>
		</section>
	);
}

export default Newsletter; 