import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Briefcase, Heart, Brain, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export default function About() {
  const experiences = [
    { title: "Psicologia Clínica", category: "Atuação" },
    { title: "Psicologia Organizacional", category: "Atuação" },
    { title: "Psicologia Social", category: "Atuação" },
  ];

  const education = [
    { school: "FAHO", degree: "Especialização em Neuropsicologia" },
    { school: "IPOG", degree: "Especialização em Avaliação Psicológica" },
    { school: "Einstein Limeira", degree: "Graduação em Psicologia" },
  ];

  // Carousel images - configured to use public folder
  const officeImages = [
    "/consultorio.jpg",
    "/consultorio2.jpg",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % officeImages.length);
  };
  
  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + officeImages.length) % officeImages.length);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="about" className="p-10 lg:p-14 bg-brand-soft">
      <div className="max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-10 rounded-xl shadow-card h-full">
            <h2 className="text-brand-primary font-bold uppercase tracking-[2px] text-xs mb-6">Sobre Mim</h2>
            <p className="text-brand-light leading-relaxed mb-6 italic text-[15px]">
              Sou Michele, psicóloga clínica, e é um prazer receber você em meu perfil. Tenho como propósito desenvolver pessoas, e foi na Psicologia que encontrei o caminho para colocar esse objetivo em prática.
            </p>
            <p className="text-brand-light leading-relaxed mb-6 text-[14px]">
              Sou formada em Psicologia, com especialização em <b>Neuropsicologia</b> e <b>Avaliação Psicológica</b>, e atuo a partir da <b>Terapia Cognitivo-Comportamental (TCC)</b>, com ênfase nos transtornos depressivos e ansiosos.
            </p>
            
            <div className="bg-brand-soft border-l-[3px] border-brand-accent p-4 mt-8">
              <p className="text-xs text-brand-secondary font-medium">
                <b>Propósito:</b> Reestruturação de pensamentos e emoções para promover mudanças significativas e construir uma melhor qualidade de vida.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-[#F0F0F0]">
               <h3 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 font-bold">Formação & Especializações</h3>
               <div className="space-y-6">
                <div>
                  <ul className="space-y-2 text-[12px] text-brand-light">
                    {education.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1 flex-shrink-0"></div>
                        <span><b className="text-brand-secondary">{item.degree}</b> — {item.school}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 h-full flex flex-col justify-center">
            {/* Carousel Section */}
            <div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
                <div className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                   <Maximize2 size={16} className="text-brand-primary" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    src={officeImages[currentIdx]} 
                    alt={`Espaço de Atendimento ${currentIdx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/office-view-${currentIdx}/1200/900`;
                    }}
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-brand-primary/5"></div>
                
                {/* Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={prevSlide}
                      className="p-2 bg-white/90 hover:bg-white text-brand-primary rounded-full shadow-lg transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="p-2 bg-white/90 hover:bg-white text-brand-primary rounded-full shadow-lg transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {officeImages.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIdx(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-4' : 'bg-white/40'}`}
                      />
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-card">
              <h4 className="text-[13px] font-bold text-brand-secondary mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Brain size={16} className="text-brand-accent" />
                Áreas de Atuação
              </h4>
              <div className="flex flex-wrap gap-2">
                {experiences.map((item, idx) => (
                  <span key={idx} className="bg-brand-soft text-brand-primary py-2 px-4 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-brand-primary/5">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for full screen image */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-secondary/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-10 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
               <button 
                onClick={prevSlide}
                className="absolute left-0 lg:-left-16 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
               >
                  <ChevronLeft size={32} />
               </button>

               <motion.img 
                  key={currentIdx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={officeImages[currentIdx]}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/office-view-${currentIdx}/1200/900`;
                  }}
               />

               <button 
                onClick={nextSlide}
                className="absolute right-0 lg:-right-16 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
               >
                  <ChevronRight size={32} />
               </button>
            </div>
            
            <div className="absolute bottom-10 text-white/50 text-sm font-medium">
                {currentIdx + 1} de {officeImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

