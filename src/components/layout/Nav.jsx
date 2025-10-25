import { Link } from "react-router-dom";

const Nav = ({ isOpen, onClose }) => {
	return (
		<nav
			className={`${
				isOpen
					? "flex flex-col items-center absolute top-16 left-0 w-full bg-white shadow-md py-6 z-50"
					: "hidden md:flex"
			} md:static md:bg-transparent md:flex-row md:shadow-none md:py-0`}
			aria-label="Main Navigation"
		>
			<ul className="flex flex-col md:flex-row gap-6 md:gap-8 text-gray-700 font-medium text-base">
				<li>
					<a
						href="#features"
						onClick={onClose}
						className="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
					>
						Features
					</a>
				</li>
				<li>
					<a
						href="#about"
						onClick={onClose}
						className="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
					>
						About
					</a>
				</li>

				{/* Auth Routes (Now using Link) */}
				<li>
					<Link
						to="/login"
						onClick={onClose}
						className="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
					>
						Login
					</Link>
				</li>
				<li>
					<Link
						to="/signup"
						onClick={onClose}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
					>
						Get Started
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
