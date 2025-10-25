export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel }) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-title"
		>
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
				<h2 id="delete-title" className="text-xl font-bold text-gray-900 mb-4">
					Confirm Delete
				</h2>
				<p className="text-gray-600 mb-6">
					Are you sure you want to delete this ticket? This action cannot be
					undone.
				</p>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onCancel}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
