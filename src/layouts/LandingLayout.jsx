import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const LandingLayout = ({ children }) => {
	return (
		<div className="layout-wrapper">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default LandingLayout;
