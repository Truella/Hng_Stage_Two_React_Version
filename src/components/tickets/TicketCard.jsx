import { Edit2, Trash2 } from "lucide-react";

export default function TicketCard({
	ticket,
	onEdit,
	onDelete,
	getStatusStyle,
	getStatusLabel,
}) {
	return (
		<article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
						onClick={() => onEdit(ticket)}
						aria-label={`Edit ticket: ${ticket.title}`}
						className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
					>
						<Edit2 className="w-4 h-4" aria-hidden="true" />
					</button>
					<button
						onClick={() => onDelete(ticket.id)}
						aria-label={`Delete ticket: ${ticket.title}`}
						className="p-2 text-red-600 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
					>
						<Trash2 className="w-4 h-4" aria-hidden="true" />
					</button>
				</div>
			</div>
		</article>
	);
}
