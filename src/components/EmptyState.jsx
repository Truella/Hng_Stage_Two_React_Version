import { AlertCircle } from "lucide-react";

export default function  EmptyState ({ searchQuery }){return (
	<div className="col-span-full text-center py-12">
		<AlertCircle
			className="w-16 h-16 text-gray-400 mx-auto mb-4"
			aria-hidden="true"
		/> 
		<h3 className="text-xl font-semibold text-gray-900 mb-2">
			No tickets found
		</h3>
		<p className="text-gray-600">
			{searchQuery
				? "Try adjusting your search query"
				: "Create your first ticket to get started"}
		</p>
	</div>
)}
