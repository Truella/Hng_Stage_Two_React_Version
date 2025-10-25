import { AlertCircle, Check } from "lucide-react";

export default function Toast({ message, type, onClose }) {
	return (
		<div
			role="alert"
			aria-live="assertive"
			className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
				type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
			}`}
		>
			{type === "success" ? (
				<Check className="w-5 h-5" aria-hidden="true" />
			) : (
				<AlertCircle className="w-5 h-5" aria-hidden="true" />
			)}
			<span>{message}</span>
		</div>
	);
}
