import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
	const navigate = useNavigate();

	return (
		<section
			className="relative overflow-hidden h-screen bg-linear-to-br from-blue-50 to-blue-100"
			aria-label="Landing hero section"
		>
			<div
				className="absolute right-7 top-12 w-20 h-20 bg-blue-300 rounded-full opacity-70 animate-pulse z-10"
				aria-hidden="true"
			></div>
			<div
				className="absolute right-7 top-12 w-40 h-40 bg-blue-200 rounded-full opacity-70 animate-pulse z-10"
				aria-hidden="true"
			></div>

			{/* Main content container with a higher z-index to ensure it is always on top */}
			<div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-20 pb-32 text-center md:pt-32 md:pb-48 ">
				<div >
					<h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
						Manage Your Tickets <br className="hidden md:block" /> Effortlessly
					</h1>

					<p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
						Simplify your workflow. Create, track, and resolve support tickets
						all in one place.
					</p>

					{/* CTA Buttons */}
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={() => navigate("/signup")}
							className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex items-center justify-center gap-2"
						>
							Get Started <ArrowRight size={18} />
						</button>

						<button
							onClick={() => navigate("/login")}
							className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
						>
							Login
						</button>
					</div>
				</div>
			</div>

			{/* Wave SVG */}
			<svg
				className="absolute bottom-0 left-0 w-full text-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<path
					fill="currentColor"
					d="M0,256L30,250.7C60,245,120,235,180,218.7C240,203,300,181,360,181.3C420,181,480,203,540,192C600,181,660,139,720,128C780,117,840,139,900,160C960,181,1020,203,1080,192C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256V320H0Z"
				></path>
			</svg>
		</section>
	);
};

export default HeroSection;
