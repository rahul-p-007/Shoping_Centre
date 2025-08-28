function PromoVideo() {
	return (
		<section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
			{/* Video Background */}
			<video
				className="absolute inset-0 w-full h-full object-cover"
				playsInline
				autoPlay
				muted
				loop
				poster="/Slide-5.jpeg"
			>
				<source src="/promo.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/30" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

			{/* Centered Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
				<div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-6 sm:px-10 sm:py-10 text-white max-w-2xl">
					<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
						Move. Breathe. Live.
					</h2>
					<p className="mt-3 text-white/90 text-base sm:text-lg">
						Performance-ready essentials designed for your everyday rhythm.
					</p>
				</div>
			</div>
		</section>
	);
}

export default PromoVideo; 