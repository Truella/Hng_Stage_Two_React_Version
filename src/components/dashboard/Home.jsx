import React, { useState, useEffect } from "react";
import {
	BarChart3,
	Ticket,
	CheckCircle,
	Clock,
	AlertCircle,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const [stats, setStats] = useState({
		total: 0,
		open: 0,
		inProgress: 0,
		resolved: 0,
	});

	useEffect(() => {
		const updateStats = () => {
			const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
			const total = storedTickets.length;
			const open = storedTickets.filter((t) => t.status === "open").length;
			const inProgress = storedTickets.filter(
				(t) => t.status === "in_progress"
			).length;
			const resolved = storedTickets.filter(
				(t) => t.status === "closed" || t.status === "resolved"
			).length;
			setStats({ total, open, inProgress, resolved });
		};

		updateStats(); // run once initially
		window.addEventListener("storage", updateStats); // update if another tab modifies storage
		return () => window.removeEventListener("storage", updateStats);
	}, []);

	const statCards = [
		{
			title: "Total Tickets",
			value: stats.total,
			icon: Ticket,
			color: "bg-blue-500",
			textColor: "text-blue-600",
			bgLight: "bg-blue-50",
		},
		{
			title: "Open Tickets",
			value: stats.open,
			icon: AlertCircle,
			color: "bg-red-500",
			textColor: "text-red-600",
			bgLight: "bg-red-50",
		},
		{
			title: "In Progress",
			value: stats.inProgress,
			icon: Clock,
			color: "bg-yellow-500",
			textColor: "text-yellow-600",
			bgLight: "bg-yellow-50",
		},
		{
			title: "Resolved",
			value: stats.resolved,
			icon: CheckCircle,
			color: "bg-green-500",
			textColor: "text-green-600",
			bgLight: "bg-green-50",
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl w-[90vw] mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
					<p className="text-gray-600">
						Overview of your ticket management system
					</p>
				</div>

				{/* Statistics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{statCards.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
							>
								<div className="flex items-center justify-between mb-4">
									<div className={`${stat.bgLight} p-3 rounded-lg`}>
										<Icon className={`w-6 h-6 ${stat.textColor}`} />
									</div>
								</div>
								<h3 className="text-gray-600 text-sm font-medium mb-1">
									{stat.title}
								</h3>
								<p className="text-3xl font-bold text-gray-900">{stat.value}</p>
							</div>
						);
					})}
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
					<h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
						<BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
						Quick Actions
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Link
							to={"/dashboard/tickets"}
							className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group"
						>
							<div className="flex items-center">
								<Ticket className="w-5 h-5 text-blue-600 mr-3" />
								<span className="font-medium text-gray-900">
									Manage Tickets
								</span>
							</div>
							<ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
						</Link>

						<button className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
							<div className="flex items-center">
								<CheckCircle className="w-5 h-5 text-green-600 mr-3" />
								<span className="font-medium text-gray-900">View Resolved</span>
							</div>
							<ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
						</button>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Recent Activity
					</h2>
					<div className="space-y-3">
						{[
							{
								action: "Ticket #1234 created",
								time: "5 minutes ago",
								status: "open",
							},
							{
								action: "Ticket #1233 resolved",
								time: "1 hour ago",
								status: "resolved",
							},
							{
								action: "Ticket #1232 updated",
								time: "3 hours ago",
								status: "progress",
							},
							{
								action: "Ticket #1231 assigned",
								time: "5 hours ago",
								status: "progress",
							},
						].map((activity, index) => (
							<div
								key={index}
								className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
							>
								<div className="flex items-center">
									<div
										className={`w-2 h-2 rounded-full mr-3 ${
											activity.status === "resolved"
												? "bg-green-500"
												: activity.status === "progress"
												? "bg-yellow-500"
												: "bg-red-500"
										}`}
									/>
									<span className="text-gray-900">{activity.action}</span>
								</div>
								<span className="text-sm text-gray-500">{activity.time}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
