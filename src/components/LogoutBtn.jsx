import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton({ isExpanded }) {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout(); // clears localStorage + resets user
		navigate("/auth/login"); // redirect to login page
	};

	return (
		<button
			className="text-sm font-medium flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-500 transition-all duration-300"
			onClick={handleLogout}
		>
			<span>Logout</span>
			<LogOut size={20} />
		</button>
	);
}
