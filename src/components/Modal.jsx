import { X } from "lucide-react";

// Modal Component
export default function Modal({ isOpen, onClose, title, children }) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-gray-500/50 overflow-y-auto h-full w-full z-50"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			onClick={onClose}
		>
			<div
				className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mt-3">
					<div className="flex items-center justify-between mb-4">
						<h3 id="modal-title" className="text-lg font-medium text-gray-900">
							{title}
						</h3>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
							aria-label="Close modal"
						>
							<X className="w-6 h-6" aria-hidden="true" />
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
