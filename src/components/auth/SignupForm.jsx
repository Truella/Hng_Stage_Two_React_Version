import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {
	const { signup } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: "", password: "" , confirmPassword: "", name: ''});
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			
			signup(formData);
			navigate("/auth/login");
		} catch (err) {
			setError(err.message);
		}
		console.log(formData)
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			{error && <p className="text-red-600 text-sm">{error}</p>}

			<label className="flex flex-col text-sm font-medium text-gray-700">
				Email
				<input
					type="email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					required
					placeholder="youremail@example.com"
				/>
			</label>
			<label className="flex flex-col text-sm font-medium text-gray-700">
				Name
				<input
					type="text"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					required
					placeholder="Enter Full Name"
				/>
			</label>

			<label className="flex flex-col text-sm font-medium text-gray-700">
				Password
				<input
					type="password"
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
					className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					required
					placeholder="Enter Password"
				/>
			</label>
			<label className="flex flex-col text-sm font-medium text-gray-700">
				Confirm Password
				<input
					type="password"
					value={formData.confirmPassword}
					onChange={(e) =>
						setFormData({ ...formData, confirmPassword: e.target.value })
					}
					className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					required
					placeholder="Confirm Password"
				/>
			</label>

			<button
				type="submit"
				className="bg-blue-600 text-white rounded-lg p-2 font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SignupForm;
