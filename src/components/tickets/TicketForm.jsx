export default function TicketForm({
	formData,
	errors,
	onChange,
	onSubmit,
	onCancel,
	isEditing,
	loading,
	error,
}) {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{/* Title Field */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Title <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={onChange}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
						errors.title ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Enter ticket title"
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-600">{errors.title}</p>
				)}
			</div>

			{/* Description Field */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Description
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={onChange}
					rows="3"
					className={`w-full px-3 py-2 border rounded-md focus:outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
						errors.description ? "border-red-500" : "border-gray-300"
					}`}
					placeholder="Enter ticket description"
				/>
				{errors.description && (
					<p className="mt-1 text-sm text-red-600">{errors.description}</p>
				)}
			</div>

			{/* Status Field */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Status <span className="text-red-500">*</span>
				</label>
				<select
					name="status"
					value={formData.status}
					onChange={onChange}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
						errors.status ? "border-red-500" : "border-gray-300"
					}`}
				>
					<option value="">Select status</option>
					<option value="open">Open</option>
					<option value="in_progress">In Progress</option>
					<option value="closed">Closed</option>
				</select>
				{errors.status && (
					<p className="mt-1 text-sm text-red-600">{errors.status}</p>
				)}
			</div>

			{/* Priority Field */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Priority
				</label>
				<select
					name="priority"
					value={formData.priority}
					onChange={onChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</div>

			{/* Error Message */}
			{error && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-md">
					<p className="text-sm text-red-600">{error}</p>
				</div>
			)}

			{/* Action Buttons */}
			<div className="flex justify-end space-x-3 pt-4">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? (
						<span className="flex items-center">
							<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
							{isEditing ? "Updating..." : "Creating..."}
						</span>
					) : (
						<span>{isEditing ? "Update Ticket" : "Create Ticket"}</span>
					)}
				</button>
			</div>
		</form>
	);
}
