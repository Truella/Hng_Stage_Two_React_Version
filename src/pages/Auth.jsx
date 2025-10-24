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
		if (isLogin) navigate("/auth/signup");
		else navigate("/auth/login");
	};

	return (
		<div>
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
