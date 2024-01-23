import ContactSecton from "@/components/layout/ContactSection";
import HomeSlider from "@/components/layout/HomeSlider";
import BusinessInfo from "@/components/layout/BusinessInfo";
import AboutSection from "@/components/layout/AboutSection";
import ServicesSection from "@/components/layout/ServicesSection";
import HomeMenu from "@/components/layout/HomeMenu";

export default function Home() {
  return (
    <>
      <HomeSlider />
      <BusinessInfo />
      <AboutSection />
      <ServicesSection />
      <HomeMenu className="pt-24" />
      <ContactSecton className="pt-12" />
    </>
  )
}
