import React, { useState } from "react";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";
import LogoutButton from "../components/LogoutBtn";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("dashboard");
	const { user } = useAuth();
	const navItems = [
		{ id: "dashboard", label: "Dashboard", path: "" },
		{ id: "tickets", label: "Tickets", path: "tickets" },
	];

	const handleNavClick = (id) => {
		setActiveTab(id);
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Top Navigation Bar */}
			<nav
				className="bg-white border-b border-gray-200 sticky top-0 z-50"
				role="navigation"
				aria-label="Main navigation"
			>
				<div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						{/* Logo and Brand */}
						<div className="flex items-center">
							<Logo />
							{/* Desktop Navigation */}
						</div>
						<div
							className="hidden md:ml-10 md:flex md:space-x-8"
							role="menubar"
						>
							{navItems.map((item) => {
								return (
									<NavLink
										to={`dashboard/${item.path}`}
										end={item.path === ""}
										key={item.id}
										role="menuitem"
										className={({ isActive }) =>
											`flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
												isActive ? "text-blue-600 bg-blue-50" : ""
											}`
										}
									>
										{item.label}
									</NavLink>
								);
							})}
						</div>

						{/* Right Side Actions */}
						<div className="flex items-center gap-6">
							<p className="text-sm text-gray-600">Welcome, {user.name}</p>
							<LogoutButton />
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
									<X className="w-6 h-6" aria-hidden="true" />
								) : (
									<Menu className="w-6 h-6" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div
						id="mobile-menu"
						className="md:hidden border-t border-gray-200 bg-white"
						role="menu"
					>
						<div className="px-4 py-3 space-y-1">
							{navItems.map((item) => {
								const Icon = item.icon;
								const active = activeTab === item.id;
								return (
									<button
										key={item.id}
										onClick={() => handleNavClick(item.id)}
										role="menuitem"
										aria-current={active ? "page" : undefined}
										className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											active
												? "bg-blue-50 text-blue-700"
												: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										}`}
									>
										<Icon className="w-5 h-5 mr-3" aria-hidden="true" />
										{item.label}
									</button>
								);
							})}

							{/* Mobile Only Actions */}
							<div className="pt-4 border-t border-gray-200 space-y-1">
								<button
									type="button"
									aria-label="View notifications, 3 unread"
									className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<Bell className="w-5 h-5 mr-3" aria-hidden="true" />
									Notifications
									<span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
										3
									</span>
								</button>

								<button
									type="button"
									aria-label="User profile"
									className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<User className="w-5 h-5 mr-3" aria-hidden="true" />
									Profile
								</button>
								<button
									type="button"
									aria-label="Logout button"
									className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<LogOut /> Logout{" "}
								</button>
							</div>
						</div>
					</div>
				)}
			</nav>

			{/* Main Content Area */}
			<main role="main" aria-label="Main content" className="max-w-[1200px] mx-auto">
				<section>
					<Outlet />
				</section>
			</main>
		</div>
	);
}
