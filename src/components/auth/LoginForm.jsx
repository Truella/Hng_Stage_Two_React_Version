import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle } from "lucide-react";

const LoginForm = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [progressWidth, setProgressWidth] = useState(0);
	const intervalRef = useRef(null);

	// Cleanup interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const startProgressBar = () => {
		setProgressWidth(0);

		intervalRef.current = setInterval(() => {
			setProgressWidth((prev) => {
				if (prev < 100) {
					return prev + 5;
				} else {
					clearInterval(intervalRef.current);
					setTimeout(() => {
						navigate("/dashboard");
					}, 100);
					return 100;
				}
			});
		}, 100);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			login(formData.email, formData.password);
			setIsSuccess(true);
			setIsLoading(false);
			startProgressBar();
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
					<CheckCircle className="w-8 h-8 text-green-600" />
				</div>
				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-2">
						Login Successful!
					</h3>
					<p className="text-gray-600">Welcome back!</p>
					<p className="text-sm text-gray-500 mt-2">
						Redirecting to dashboard...
					</p>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div
						className="bg-green-600 h-2 rounded-full"
						style={{ width: `${progressWidth}%` }}
					></div>
				</div>
			</div>
		);
	}

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
				/>
			</label>

			<button
				type="submit"
				disabled={isLoading}
				className="bg-blue-600 text-white rounded-lg p-2 font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? (
					<span className="flex items-center justify-center gap-2">
						<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						Signing In...
					</span>
				) : (
					"Login"
				)}
			</button>
		</form>
	);
};

export default LoginForm;
