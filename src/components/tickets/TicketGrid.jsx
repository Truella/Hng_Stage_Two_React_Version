import TicketCard from "./TicketCard";
import EmptyState from '../EmptyState'
export default function TicketGrid({
	tickets,
	onEdit,
	onDelete,
	getStatusStyle,
	getStatusLabel,
	searchQuery,
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{tickets.length === 0 ? (
				<EmptyState searchQuery={searchQuery} />
			) : (
				tickets.map((ticket) => (
					<TicketCard
						key={ticket.id}
						ticket={ticket}
						onEdit={onEdit}
						onDelete={onDelete}
						getStatusStyle={getStatusStyle}
						getStatusLabel={getStatusLabel}
					/> 
				))
			)}
		</div>
	);
}
