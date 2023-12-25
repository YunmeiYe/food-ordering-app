import Hero from "@/components/layout/Hero";
import Header from "@/components/layout/Header";
import HomeMenu from "@/components/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import AboutUs from "@/components/layout/AboutUs";
import ContactUs from "@/components/layout/ContactUs";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  )
}
