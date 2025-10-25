import { FormInput, FormSelect, FormTextarea } from "./FormInput";

export default function TicketForm({
	formData,
	errors,
	onChange,
	onSubmit,
	onCancel,
	isEditing,
}) {
	return (
		<div className="space-y-6">
			<FormInput
				label="Title"
				id="title"
				name="title"
				value={formData.title}
				onChange={onChange}
				error={errors.title}
				required
				placeholder="Enter ticket title"
			/>
			<FormTextarea
				label="Description"
				id="description"
				name="description"
				value={formData.description}
				onChange={onChange}
				error={errors.description}
				placeholder="Enter ticket description (optional)"
			/>

			<FormSelect
				label="Status"
				id="status"
				name="status"
				value={formData.status}
				onChange={onChange}
				error={errors.status}
				required
				options={[
					{ value: "open", label: "Open" },
					{ value: "in_progress", label: "In Progress" },
					{ value: "closed", label: "Closed" },
				]}
			/>

			<FormSelect
				label="Priority"
				id="priority"
				name="priority"
				value={formData.priority}
				onChange={onChange}
				options={[
					{ value: "low", label: "Low" },
					{ value: "medium", label: "Medium" },
					{ value: "high", label: "High" },
				]}
			/>

			<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={onSubmit}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
				>
					{isEditing ? "Update Ticket" : "Create Ticket"}
				</button>
			</div>
		</div>
	);
}
