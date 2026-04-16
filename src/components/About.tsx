import { motion } from "motion/react";
import { GraduationCap, Briefcase, Heart, Brain } from "lucide-react";

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

  return (
    <section id="about" className="p-10 lg:p-14 bg-brand-soft">
      <div className="max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-xl shadow-card">
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
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-card">
              <h3 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 border-b border-[#F0F0F0] pb-2 font-bold">Formação & Experiência</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[13px] font-bold text-brand-secondary mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                    Especializações
                  </h4>
                  <ul className="space-y-2 text-[12px] text-brand-light ml-4">
                    {education.map((item, idx) => (
                      <li key={idx}><b className="text-brand-secondary">{item.degree}</b> — {item.school}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[13px] font-bold text-brand-secondary mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                    Áreas de Atuação
                  </h4>
                  <div className="flex flex-wrap gap-2 ml-4">
                    {experiences.map((item, idx) => (
                      <span key={idx} className="bg-[#F0F2F1] text-brand-primary py-1 px-3 rounded text-[11px] font-medium">
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-card">
                <img 
                    src="https://picsum.photos/seed/therapy-session/600/400" 
                    alt="Espaço de Atendimento" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

