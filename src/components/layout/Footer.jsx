import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-gray-100 text-gray-700 mt-16 border-t border-gray-200">
			<div className="max-w-[1440px] mx-auto px-6 py-10 flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
				{/* Logo / App Name */}
				<h3 className="text-2xl font-semibold text-blue-600 mb-4 md:mb-0">
					TicketFlow
				</h3>

				{/* Navigation Links */}
				<ul className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
					<li>
						<a href="#features" className="hover:text-blue-600 transition">
							Features
						</a>
					</li>
					<li>
						<a href="#about" className="hover:text-blue-600 transition">
							About
						</a>
					</li>
					<li>
						<a href="/auth/login" className="hover:text-blue-600 transition">
							Login
						</a>
					</li>
					<li>
						<a href="/auth/signup" className="hover:text-blue-600 transition">
							Get Started
						</a>
					</li>
				</ul>

				{/* Social Icons + Copyright */}
				<div className="flex flex-col items-center gap-4 md:items-end">
					<div className="flex gap-5">
						<a
							href="#"
							aria-label="Visit our GitHub"
							className="text-gray-500 hover:text-blue-600 transition"
						>
							<Github size={20} strokeWidth={1.5} />
						</a>
						<a
							href="#"
							aria-label="Visit our Twitter"
							className="text-gray-500 hover:text-blue-600 transition"
						>
							<Twitter size={20} strokeWidth={1.5} />
						</a>
						<a
							href="#"
							aria-label="Visit our LinkedIn"
							className="text-gray-500 hover:text-blue-600 transition"
						>
							<Linkedin size={20} strokeWidth={1.5} />
						</a>
					</div>

					<p className="text-sm text-gray-500">
						© {new Date().getFullYear()} TicketFlow. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
