import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";

export default function App() {
	return (
		<Routes>
			{/* Landing Page */}
			<Route path="/" element={<LandingPage />} />

			{/* Auth Routes */}
			<Route path="/auth" element={<AuthLayout />}>
				<Route path="login" element={<Auth />} />
				<Route path="signup" element={<Auth />} />
			</Route>
		</Routes>
	);
}
