// src/routes/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white">
				<p className="text-gray-600 text-sm">Checking authentication...</p>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
