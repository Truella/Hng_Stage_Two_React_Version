
/* import React, { useState, useEffect } from "react";
import {
	Plus,
	Edit2,
	Trash2,
	X,
	Check,
	AlertCircle,
	Search,
} from "lucide-react";

export default function Tickets() {
	const [tickets, setTickets] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingTicket, setEditingTicket] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [toast, setToast] = useState(null);
	const [errors, setErrors] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "open",
		priority: "medium",
	});

	useEffect(() => {
		const session = localStorage.getItem("ticketapp_session");
		if (!session) {
			showToast("Your session has expired — please log in again.", "error");
			setTimeout(() => {
				window.location.href = "/auth/login";
			}, 2000);
			return;
		}
		setIsAuthenticated(true);
		loadTickets();
	}, []);

	const loadTickets = () => {
		try {
			const stored = localStorage.getItem("tickets");
			if (stored) {
				setTickets(JSON.parse(stored));
			}
		} catch (error) {
			showToast("Failed to load tickets. Please retry.", "error");
		}
	};

	const saveTickets = (newTickets) => {
		try {
			localStorage.setItem("tickets", JSON.stringify(newTickets));
			setTickets(newTickets);
		} catch (error) {
			showToast("Failed to save tickets. Please retry.", "error");
		}
	};

	const showToast = (message, type = "success") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 4000);
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		} else if (formData.title.length > 100) {
			newErrors.title = "Title must be less than 100 characters";
		}

		if (!formData.status) {
			newErrors.status = "Status is required";
		} else if (!["open", "in_progress", "closed"].includes(formData.status)) {
			newErrors.status = "Status must be open, in_progress, or closed";
		}

		if (formData.description && formData.description.length > 500) {
			newErrors.description = "Description must be less than 500 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = () => {
		if (!validateForm()) {
			showToast("Please fix the errors in the form", "error");
			return;
		}

		if (editingTicket) {
			const updatedTickets = tickets.map((ticket) =>
				ticket.id === editingTicket.id
					? { ...ticket, ...formData, updatedAt: new Date().toISOString() }
					: ticket
			);
			saveTickets(updatedTickets);
			showToast("Ticket updated successfully!", "success");
		} else {
			const newTicket = {
				id: Date.now().toString(),
				...formData,
				createdAt: new Date().toISOString(),
			};
			const updatedTickets = [...tickets, newTicket];
			saveTickets(updatedTickets);
			showToast("Ticket created successfully!", "success");
		}

		resetForm();
	};

	const handleDelete = (id) => {
		const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
		saveTickets(updatedTickets);
		showToast("Ticket deleted successfully!", "success");
		setDeleteConfirm(null);
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			status: "open",
			priority: "medium",
		});
		setErrors({});
		setIsFormOpen(false);
		setEditingTicket(null);
	};

	const openEditForm = (ticket) => {
		setEditingTicket(ticket);
		setFormData({
			title: ticket.title,
			description: ticket.description || "",
			status: ticket.status,
			priority: ticket.priority,
		});
		setIsFormOpen(true);
	};

	const filteredTickets = tickets.filter((ticket) => {
		const matchesSearch =
			ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(ticket.description &&
				ticket.description.toLowerCase().includes(searchQuery.toLowerCase()));

		const matchesStatus =
			statusFilter === "all" || ticket.status === statusFilter;

		return matchesSearch && matchesStatus;
	});
	const getStatusStyle = (status) => {
		const styles = {
			open: "bg-green-100 text-green-800 border-green-300",
			in_progress: "bg-amber-100 text-amber-800 border-amber-300",
			closed: "bg-gray-100 text-gray-800 border-gray-300",
		};
		return styles[status] || styles.open;
	};

	const getStatusLabel = (status) => {
		const labels = {
			open: "Open",
			in_progress: "In Progress",
			closed: "Closed",
		};
		return labels[status] || status;
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Authentication Required
					</h2>
					<p className="text-gray-600">Redirecting to login...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				style={{ maxWidth: "1440px" }}
			>
				{toast && (
					<div
						role="alert"
						aria-live="assertive"
						className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
							toast.type === "success"
								? "bg-green-500 text-white"
								: "bg-red-500 text-white"
						}`}
					>
						{toast.type === "success" ? (
							<Check className="w-5 h-5" aria-hidden="true" />
						) : (
							<AlertCircle className="w-5 h-5" aria-hidden="true" />
						)}
						<span>{toast.message}</span>
					</div>
				)}

				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Ticket Management
					</h1>
					<p className="text-gray-600">
						Create, view, edit, and manage support tickets
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
						<div className="relative">
							<label htmlFor="status-filter" className="sr-only">
								Filter by status
							</label>
							<select
								id="status-filter"
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
								aria-label="Filter tickets by status"
							>
								<option value="all">All Status</option>
								<option value="open">Open</option>
								<option value="in_progress">In Progress</option>
								<option value="closed">Closed</option>
							</select>
						</div>

						<div className="relative w-full sm:w-96">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
								aria-hidden="true"
							/>
							<input
								type="search"
								placeholder="Search tickets..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								aria-label="Search tickets"
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<button
						onClick={() => setIsFormOpen(true)}
						className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
						aria-label="Create new ticket"
					>
						<Plus className="w-5 h-5 mr-2" aria-hidden="true" />
						Create Ticket
					</button>
				</div>
				{isFormOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
						role="dialog"
						aria-modal="true"
						aria-labelledby="form-title"
					>
						<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
							<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
								<h2
									id="form-title"
									className="text-2xl font-bold text-gray-900"
								>
									{editingTicket ? "Edit Ticket" : "Create New Ticket"}
								</h2>
								<button
									onClick={resetForm}
									aria-label="Close form"
									className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<X className="w-6 h-6" aria-hidden="true" />
								</button>
							</div>

							<div className="p-6 space-y-6">
								<div>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Title{" "}
										<span className="text-red-500" aria-label="required">
											*
										</span>
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										aria-required="true"
										aria-invalid={errors.title ? "true" : "false"}
										aria-describedby={errors.title ? "title-error" : undefined}
										className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											errors.title ? "border-red-500" : "border-gray-300"
										}`}
										placeholder="Enter ticket title"
									/>
									{errors.title && (
										<p
											id="title-error"
											role="alert"
											className="mt-1 text-sm text-red-600 flex items-center"
										>
											<AlertCircle
												className="w-4 h-4 mr-1"
												aria-hidden="true"
											/>
											{errors.title}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Description
									</label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										aria-invalid={errors.description ? "true" : "false"}
										aria-describedby={
											errors.description ? "description-error" : undefined
										}
										rows={4}
										className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											errors.description ? "border-red-500" : "border-gray-300"
										}`}
										placeholder="Enter ticket description (optional)"
									/>
									{errors.description && (
										<p
											id="description-error"
											role="alert"
											className="mt-1 text-sm text-red-600 flex items-center"
										>
											<AlertCircle
												className="w-4 h-4 mr-1"
												aria-hidden="true"
											/>
											{errors.description}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="status"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Status{" "}
										<span className="text-red-500" aria-label="required">
											*
										</span>
									</label>
									<select
										id="status"
										name="status"
										value={formData.status}
										onChange={handleInputChange}
										aria-required="true"
										aria-invalid={errors.status ? "true" : "false"}
										aria-describedby={
											errors.status ? "status-error" : undefined
										}
										className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											errors.status ? "border-red-500" : "border-gray-300"
										}`}
									>
										<option value="open">Open</option>
										<option value="in_progress">In Progress</option>
										<option value="closed">Closed</option>
									</select>
									{errors.status && (
										<p
											id="status-error"
											role="alert"
											className="mt-1 text-sm text-red-600 flex items-center"
										>
											<AlertCircle
												className="w-4 h-4 mr-1"
												aria-hidden="true"
											/>
											{errors.status}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="priority"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Priority
									</label>
									<select
										id="priority"
										name="priority"
										value={formData.priority}
										onChange={handleInputChange}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>

								<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
									<button
										type="button"
										onClick={resetForm}
										className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
									>
										Cancel
									</button>
									<button
										type="button"
										onClick={handleSubmit}
										className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
									>
										{editingTicket ? "Update Ticket" : "Create Ticket"}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{deleteConfirm && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
						role="dialog"
						aria-modal="true"
						aria-labelledby="delete-title"
					>
						<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
							<h2
								id="delete-title"
								className="text-xl font-bold text-gray-900 mb-4"
							>
								Confirm Delete
							</h2>
							<p className="text-gray-600 mb-6">
								Are you sure you want to delete this ticket? This action cannot
								be undone.
							</p>
							<div className="flex justify-end space-x-3">
								<button
									onClick={() => setDeleteConfirm(null)}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDelete(deleteConfirm)}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredTickets.length === 0 ? (
						<div className="col-span-full text-center py-12">
							<AlertCircle
								className="w-16 h-16 text-gray-400 mx-auto mb-4"
								aria-hidden="true"
							/>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								No tickets found
							</h3>
							<p className="text-gray-600">
								{searchQuery
									? "Try adjusting your search query"
									: "Create your first ticket to get started"}
							</p>
						</div>
					) : (
						filteredTickets.map((ticket) => (
							<article
								key={ticket.id}
								className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
							>
								<div className="flex justify-between items-start mb-4">
									<h3 className="text-lg font-semibold text-gray-900 flex-1 mr-2">
										{ticket.title}
									</h3>
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
											ticket.status
										)}`}
									>
										{getStatusLabel(ticket.status)}
									</span>
								</div>

								{ticket.description && (
									<p className="text-gray-600 text-sm mb-4 line-clamp-3">
										{ticket.description}
									</p>
								)}

								<div className="flex items-center justify-between pt-4 border-t border-gray-200">
									<span className="text-xs text-gray-500 capitalize">
										Priority: {ticket.priority}
									</span>
									<div className="flex space-x-2">
										<button
											onClick={() => openEditForm(ticket)}
											aria-label={`Edit ticket: ${ticket.title}`}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
										>
											<Edit2 className="w-4 h-4" aria-hidden="true" />
										</button>
										<button
											onClick={() => setDeleteConfirm(ticket.id)}
											aria-label={`Delete ticket: ${ticket.title}`}
											className="p-2 text-red-600 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
										>
											<Trash2 className="w-4 h-4" aria-hidden="true" />
										</button>
									</div>
								</div>
							</article>
						))
					)}
				</div>
			</div>
		</div>
	);
}*/