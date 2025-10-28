import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const closeMenu = () => setMenuOpen(false);

	return (
		<header
			className="bg-white shadow-sm sticky top-0 z-50 h-[10vh] flex items-center "
			role="banner"
			aria-label="Site Header"
		>
			<div className="w-full px-16 flex items-center justify-between">
				{/* Logo */}
				<Logo />

				{/* Desktop / Mobile Navigation */}
				<Nav isOpen={menuOpen} onClose={closeMenu} />

				{/* Mobile Toggle Button */}
				<button
					className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
					onClick={toggleMenu}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					aria-expanded={menuOpen}
					aria-controls="main-navigation"
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>
		</header>
	);
};

export default Header;
