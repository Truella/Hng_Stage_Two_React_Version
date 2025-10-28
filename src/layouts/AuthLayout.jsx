import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<section
			className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 relative overflow-hidden"
			aria-label="Authentication page layout"
		>
			{/* Decorative circles */}
			<div
				className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-70"
				aria-hidden="true"
			></div>
			<div
				className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-70"
				aria-hidden="true"
			></div>

			{/* Auth Form Container */}
			<div className="relative z-10 w-[90vw] max-w-md bg-white shadow-lg rounded-2xl px-8 py-10 md:px-10">
				<Outlet />
			</div>
		</section>
	);
};

export default AuthLayout;
