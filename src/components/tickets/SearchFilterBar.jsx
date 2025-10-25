import { Plus, Search } from "lucide-react";

export default function SearchFilterBar({
	searchQuery,
	setSearchQuery,
	statusFilter,
	setStatusFilter,
	onCreateClick,
}) {
	return (
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
				onClick={onCreateClick}
				className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
				aria-label="Create new ticket"
			>
				<Plus className="w-5 h-5 mr-2" aria-hidden="true" />
				Create Ticket
			</button>
		</div>
	);
}
