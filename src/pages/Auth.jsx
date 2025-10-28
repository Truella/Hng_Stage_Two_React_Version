import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname.includes("signup")) setIsLogin(false);
		else setIsLogin(true);
	}, [location.pathname]);

	const handleToggle = () => {
		if (isLogin) navigate("/signup");
		else navigate("/login");
	};

	return (
		<div>
			<a
				href="/"
				class="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition mb-4"
			>
				<svg
					class="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Back to Home
			</a>

			<h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
				{isLogin ? "Welcome Back" : "Create an Account"}
			</h2>

			<AnimatePresence mode="wait">
				{isLogin ? (
					<motion.div
						key="login"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<LoginForm />
					</motion.div>
				) : (
					<motion.div
						key="signup"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<SignupForm />
					</motion.div>
				)}
			</AnimatePresence>

			<p className="text-center text-sm text-gray-600 mt-6">
				{isLogin ? (
					<>
						Don’t have an account?{" "}
						<button
							onClick={handleToggle}
							className="text-blue-600 hover:underline"
						>
							Sign up
						</button>
					</>
				) : (
					<>
						Already have an account?{" "}
						<button
							onClick={handleToggle}
							className="text-blue-600 hover:underline"
						>
							Log in
						</button>
					</>
				)}
			</p>
		</div>
	);
};

export default Auth;
