import Hero from "../components/Hero";
import RelationalPain from "../components/RelationalPain";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import MainLayout from "../components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <RelationalPain />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </MainLayout>
  );
}
