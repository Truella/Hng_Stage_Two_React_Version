import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Tickets from "./pages/Tickets";

export default function App() {
	return (
		<Routes>
			{/* Landing Page */}
			<Route path="/" element={<LandingPage />} />

			{/* Auth Routes */}
			<Route element={<AuthLayout />}>
				<Route path="login" element={<Auth />} />
				<Route path="signup" element={<Auth />} />
			</Route>
			{/*Dashboard routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<DashboardLayout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="dashboard/tickets" element={<Tickets/>} />
				</Route>
			</Route>
		</Routes>
	);
}
