import Navbar from "./Navbar";
import TherapyForm from "./TherapyForm";
import { AnimatePresence } from "motion/react";
import { useUI } from "../context/UIContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isFormOpen, openForm, closeForm } = useUI();

  return (
    <div className="min-h-screen bg-brand-soft flex">
      <Navbar onOpenForm={openForm} />
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {children}
      </div>

      <AnimatePresence>
        {isFormOpen && <TherapyForm onClose={closeForm} />}
      </AnimatePresence>
    </div>
  );
}
