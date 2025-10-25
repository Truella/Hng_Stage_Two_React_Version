import { X } from "lucide-react";

// Modal Component
export default function Modal({ isOpen, onClose, title, children }) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
					<h2 id="modal-title" className="text-2xl font-bold text-gray-900">
						{title}
					</h2>
					<button
						onClick={onClose}
						aria-label="Close form"
						className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<X className="w-6 h-6" aria-hidden="true" />
					</button> 
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
