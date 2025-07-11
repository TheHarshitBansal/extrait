import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";

const Home = async () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
