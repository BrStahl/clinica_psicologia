import { useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import TherapyForm from "../components/TherapyForm";
import { AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-soft flex">
      <Navbar onOpenForm={() => setIsFormOpen(true)} />
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <Hero onOpenForm={() => setIsFormOpen(true)} />
        <About />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {isFormOpen && <TherapyForm onClose={() => setIsFormOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
