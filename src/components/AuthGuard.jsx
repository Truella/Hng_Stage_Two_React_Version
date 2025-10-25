import { AlertCircle } from "lucide-react";

export default  function AuthGuard  ({ children, isAuthenticated })  {
	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Authentication Required
					</h2>
					<p className="text-gray-600">Redirecting to login...</p>
				</div> 
			</div>
		);
	}
	return children;
};
