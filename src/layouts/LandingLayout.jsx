import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const LandingLayout = ({ children }) => {
	return (
		<div className="layout-wrapper bg-gray-50">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default LandingLayout;
