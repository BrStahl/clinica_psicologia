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
    <section id="about" className="p-10 lg:p-14 bg-brand-soft pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Profile and Bio Row */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-brand-primary font-bold uppercase tracking-[3px] text-xs mb-4">Trajetória Profissional</h2>
            <h3 className="text-4xl font-serif text-brand-secondary mb-8">Dra. Michele Braz</h3>
            
            <div className="space-y-4 text-brand-light leading-relaxed text-lg">
              <p>
                Sou psicóloga clínica, especialista em Neuropsicologia e Avaliação Psicológica, com atuação na abordagem Cognitivo-Comportamental (TCC). Atualmente, estou em formação em Terapia de Relacionamentos e Casais.
              </p>
              <p>
                Há 5 anos atuo com foco em relacionamentos, acompanhando casais e pessoas que se sentem machucadas, incompreendidas ou presas em relações marcadas por conflitos, insegurança e distanciamento emocional.
              </p>
              <p>
                Na prática clínica, vejo diariamente que é possível reconstruir relacionamentos que parecem fragilizados ou sem esperança, fortalecendo vínculos e resgatando a conexão emocional.
              </p>
              <p>
                Também realizo psicoterapia individual com adolescentes e adultos, com foco em ansiedade, autoestima e dependência emocional.
              </p>
              <p>
                Ofereço um atendimento acolhedor, ético e baseado em evidências, respeitando o tempo e a individualidade de cada paciente.
                <br />
                <span className="font-bold text-brand-secondary mt-2 inline-block">Atendimento online e presencial.</span>
              </p>
            </div>
            
            <div className="bg-brand-primary/5 p-6 mt-10 rounded-2xl border border-brand-primary/10">
               <h4 className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest mb-4">
                  <Brain size={16} /> Áreas de Atuação
               </h4>
               <div className="flex flex-wrap gap-2">
                {experiences.map((item, idx) => (
                  <span key={idx} className="bg-white text-brand-primary py-2 px-4 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-accent/20 rounded-3xl -rotate-3"></div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white z-10 mx-auto max-w-sm lg:max-w-none">
                <img 
                  src="/foto-perfil.jpg" 
                  alt="Dra. Michele Braz"
                  className="w-full h-full object-cover shadow-inner"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Office and Education Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mt-24 pt-20 border-t border-brand-primary/10">
          <div className="space-y-8">
            <h3 className="text-2xl font-serif text-brand-secondary">Onde acontece o acolhimento</h3>
            <p className="text-brand-light leading-relaxed">
              Um ambiente preparado para oferecer sigilo, conforto e a tranquilidade necessária para o seu processo terapêutico. Localizado em Limeira-SP, o consultório é um espaço de escuta ativa e acolhimento genuíno.
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-card border border-brand-soft">
               <h4 className="text-xs uppercase tracking-[2px] text-brand-accent mb-6 font-bold flex items-center gap-2">
                  <GraduationCap size={16} /> Especializações & Formação
               </h4>
               <ul className="space-y-4 text-[13px] text-brand-light">
                  {education.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-brand-primary/30 mt-1 transition-colors group-hover:bg-brand-primary"></div>
                      <span><b className="text-brand-secondary">{item.degree}</b> <span className="block text-[11px] text-brand-accent mt-0.5">{item.school}</span></span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          <div className="relative">
            {/* Carousel Section */}
            <div 
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white group cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
                <div className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                   <Maximize2 size={16} className="text-brand-primary" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={officeImages[currentIdx]} 
                    alt={`Espaço de Atendimento ${currentIdx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-brand-secondary/5"></div>
                
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button onClick={prevSlide} className="p-3 bg-white/90 hover:bg-white text-brand-primary rounded-full shadow-xl"><ChevronLeft size={20} /></button>
                    <button onClick={nextSlide} className="p-3 bg-white/90 hover:bg-white text-brand-primary rounded-full shadow-xl"><ChevronRight size={20} /></button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {officeImages.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-6' : 'bg-white/40'}`}
                      />
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
            <button className="absolute top-8 right-8 text-white/70 hover:text-white"><X size={40} /></button>
            <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
               <button onClick={prevSlide} className="absolute left-0 lg:-left-20 p-5 bg-white/10 hover:bg-white/20 text-white rounded-full"><ChevronLeft size={40} /></button>
               <motion.img 
                  key={currentIdx}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={officeImages[currentIdx]}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
               />
               <button onClick={nextSlide} className="absolute right-0 lg:-right-20 p-5 bg-white/10 hover:bg-white/20 text-white rounded-full"><ChevronRight size={40} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

