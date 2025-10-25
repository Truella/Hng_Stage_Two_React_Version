import React, { useState } from "react";
import {
	Menu,
	X,
	Home,
	Ticket,
	BarChart3,
	Settings,
	Bell,
	User,
    LogOut,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { path } from "framer-motion/client";
import LogoutButton from "../components/LogoutBtn";

export default function DashboardLayout() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("dashboard");

	const navItems = [
		{ id: "dashboard", icon: Home, label: "Dashboard", path: "" },
		{ id: "tickets", icon: Ticket, label: "Tickets", path: "tickets" },
		{ id: "analytics", icon: BarChart3, label: "Analytics", path: "" },
		{ id: "settings", icon: Settings, label: "Settings", path: "" },
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
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						{/* Logo and Brand */}
						<div className="flex items-center">
							<button
								onClick={() => handleNavClick("dashboard")}
								className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
								aria-label="Go to dashboard home"
							>
								<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
									<Ticket className="w-5 h-5 text-white" aria-hidden="true" />
								</div>
								<span className="text-xl font-bold text-gray-900">
									TicketHub
								</span>
							</button>

							{/* Desktop Navigation */}
							<div
								className="hidden md:ml-10 md:flex md:space-x-1"
								role="menubar"
							>
								{navItems.map((item) => {
									const Icon = item.icon;
									const active = activeTab === item.id;
									return (
										<Link
											to={`dashboard/${item.path}`}
											key={item.id}
											onClick={() => handleNavClick(item.id)}
											role="menuitem"
											aria-current={active ? "page" : undefined}
											className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
												active
													? "bg-blue-50 text-blue-700"
													: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
											}`}
										>
											<Icon className="w-5 h-5 mr-2" aria-hidden="true" />
											{item.label}
										</Link>
									);
								})}
							</div>
						</div>

						{/* Right Side Actions */}
						<div className="flex items-center space-x-4">
							{/* Notifications */}
							<button
								type="button"
								aria-label="View notifications, 3 unread"
								className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<Bell className="w-5 h-5" aria-hidden="true" />
								<span
									className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
									aria-hidden="true"
								></span>
							</button>

							{/* User Menu */}
							<button
								type="button"
								aria-label="User menu"
								aria-haspopup="true"
								className="hidden sm:flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
									<User className="w-5 h-5 text-white" aria-hidden="true" />
								</div>
							</button>
							<LogoutButton/>
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
			<main role="main" aria-label="Main content" className="p-8">
				<section>
					<Outlet />
				</section>
			</main>
		</div>
	);
}
