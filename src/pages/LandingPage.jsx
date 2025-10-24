import About from "../components/layout/About";
import Features from "../components/layout/Features";
import HeroSection from "../components/layout/HeroSection";
import LandingLayout from "../layouts/LandingLayout";
//import HeroWave from "../assets/hero-wave.svg";

const LandingPage = () => {
	return (
		<LandingLayout>
			<HeroSection />
            <Features/>
            <About/>
		</LandingLayout>
	);
};

export default LandingPage;
