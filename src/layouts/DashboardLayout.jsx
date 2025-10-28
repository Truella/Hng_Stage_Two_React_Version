import React, { useState } from "react";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";
import LogoutButton from "../components/LogoutBtn";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user } = useAuth();

	const navItems = [
		{ id: "dashboard", label: "Dashboard", path: "/dashboard", icon: User },
		{ id: "tickets", label: "Tickets", path: "/dashboard/tickets", icon: User },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Top Navigation Bar */}
			<nav
				className="bg-white border-b border-gray-200 sticky top-0 z-50"
				aria-label="Main navigation"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						{/* Logo */}
						<div className="flex items-center">
							<Logo />
						</div>

						{/* Desktop Nav */}
						<div className="hidden md:flex md:space-x-8">
							{navItems.map((item) => (
								<NavLink
									key={item.id}
									to={item.path}
									end={item.path === "/dashboard"}
									className={({ isActive }) =>
										`flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											isActive ? "text-blue-600 bg-blue-50" : ""
										}`
									}
								>
									{item.label}
								</NavLink>
							))}
						</div>

						{/* Right Side Actions */}
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600 hidden md:block">
								Welcome, {user.name}
							</span>
							<div className="hidden md:block">
								{" "}
								<LogoutButton />
							</div>

							{/* Mobile Menu Button */}
							<button
								type="button"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-expanded={isMobileMenuOpen}
								aria-controls="mobile-menu"
								aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
								className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{isMobileMenuOpen ? (
									<X className="w-6 h-6" />
								) : (
									<Menu className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div
						id="mobile-menu"
						className="md:hidden border-t border-gray-200 bg-white transition-all duration-300"
						role="menu"
					>
						<div className="px-4 py-3 space-y-1">
							{navItems.map((item) => {
								const active = window.location.pathname === item.path;
								return (
									<NavLink
										key={item.id}
										to={item.path}
										onClick={() => setIsMobileMenuOpen(false)}
										className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none ${
											active
												? "bg-blue-50 text-blue-700"
												: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										}`}
									>
										<item.icon className="w-5 h-5 mr-3" />
										{item.label}
									</NavLink>
								);
							})}

							{/* Mobile Only Actions */}
							<div className="pt-4 border-t border-gray-200 space-y-1">
								<LogoutButton mobile />
							</div>
						</div>
					</div>
				)}
			</nav>

			{/* Main Content */}
			<main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>
		</div>
	);
}
