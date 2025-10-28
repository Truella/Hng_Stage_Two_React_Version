const About = () => {
	return (
		<section
			id="about"
			className="relative py-20 overflow-hidden w-[90vw] mx-auto"
			aria-labelledby="about-heading"
		>
			<div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				{/* Left side - Image or illustration */}
				<div>
					<div className="w-full max-w-sm md:max-w-md bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl h-80 flex items-center justify-center">
						<svg
							className="w-32 h-32 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Right side - Text content */}
				<div>
					<h2
						id="about-heading"
						className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
					>
						About Resolvr.
					</h2>

					<p className="text-gray-600 leading-relaxed mb-6">
						Resolvr is your all-in-one platform for managing tickets, tasks, and
						support requests with ease. Whether you’re a small team or a growing
						company, Resolvr helps you stay organized, resolve issues faster,
						and track progress effortlessly — all from one dashboard.
					</p>

					<p className="text-gray-600 leading-relaxed">
						Built with simplicity and performance in mind, our goal is to make
						ticket management intuitive and enjoyable. Stay focused on what
						matters — we’ll handle the workflow.
					</p>

					<button
						onClick={() => (window.location.href = "/auth/signup")}
						className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
					>
						Get Started
					</button>
				</div>
			</div>
		</section>
	);
};

export default About;
