import { useState, useEffect } from "react";
import Toast from "../components/Toast";
import PageHeader from "../components/tickets/PageHeader";
import SearchFilterBar from "../components/tickets/SearchFilterBar";
import Modal from "../components/Modal";
import TicketForm from "../components/tickets/TicketForm";
import DeleteConfirmModal from "../components/tickets/DeleteConfirmModal";
import TicketGrid from "../components/tickets/TicketGrid";
import { Loader2 } from "lucide-react";

export default function Tickets() {
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingTicket, setEditingTicket] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [toast, setToast] = useState(null);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "open",
		priority: "medium",
	});

	useEffect(() => {
		loadTickets();
	}, []);

	const loadTickets = () => {
		try {
			const stored = localStorage.getItem("tickets");
			if (stored) {
				setTickets(JSON.parse(stored));
			}
			setTimeout(() => setLoading(false), 1000);
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
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				style={{ maxWidth: "1440px" }}
			>
				{toast && <Toast message={toast.message} type={toast.type} />}

				<PageHeader />
				<SearchFilterBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					onCreateClick={() => setIsFormOpen(true)}
				/>

				<Modal
					isOpen={isFormOpen}
					onClose={resetForm}
					title={editingTicket ? "Edit Ticket" : "Create New Ticket"}
				>
					<TicketForm
						formData={formData}
						errors={errors}
						onChange={handleInputChange}
						onSubmit={handleSubmit}
						onCancel={resetForm}
						isEditing={!!editingTicket}
					/>
				</Modal>

				<DeleteConfirmModal
					isOpen={!!deleteConfirm}
					onConfirm={() => handleDelete(deleteConfirm)}
					onCancel={() => setDeleteConfirm(null)}
				/>
				{loading ? (
					<div className=" flex items-center justify-center">
						<Loader2 className="animate-spin w-12 h-12 text-blue-600" />
					</div>
				) : (
					<TicketGrid
						tickets={filteredTickets}
						onEdit={openEditForm}
						onDelete={setDeleteConfirm}
						getStatusStyle={getStatusStyle}
						getStatusLabel={getStatusLabel}
						searchQuery={searchQuery}
					/>
				)}
			</div>
		</div>
	);
}
