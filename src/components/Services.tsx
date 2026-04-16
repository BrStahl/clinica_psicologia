import { motion } from "motion/react";

export default function Services() {
  const approaches = [
    { title: "Terapia Cognitivo-Comportamental", description: "Foco na reestruturação de pensamentos e comportamentos para mudanças duradouras." },
    { title: "Terapia de Casal", description: "Auxílio na comunicação, fortalecimento do vínculo e resolução de conflitos." },
    { title: "Neuropsicologia", description: "Estudo das relações entre o cérebro e o comportamento humano." },
    { title: "Avaliação Psicológica", description: "Processo técnico-científico de coleta de dados para entender demandas específicas." },
  ];

  const conditions = [
    "Depressão / Ansiedade", 
    "TDAH / Ataque de Pânico", 
    "Conflitos de Casal", 
    "Bullying / Estresse",
    "Alterações do humor",
    "Dificuldades no relacionamento"
  ];

  return (
    <section id="services" className="p-10 lg:p-14 bg-brand-soft">
      <div className="max-w-6xl">
        <div className="mb-12">
            <h2 className="text-brand-primary font-bold uppercase tracking-[2px] text-xs mb-2">Serviços</h2>
            <h3 className="text-3xl font-serif text-brand-secondary">Especialidades e Áreas de Atendimento</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-card">
              <h3 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 border-b border-[#F0F0F0] pb-2 font-bold">Abordagens Terapêuticas</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {approaches.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="text-[13px] font-bold text-brand-secondary mb-2">{item.title}</h4>
                    <p className="text-[11px] text-brand-light leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-card">
              <h3 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 border-b border-[#F0F0F0] pb-2 font-bold">Demandas Clínicas</h3>
              <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
                {conditions.map((item, idx) => (
                  <li key={idx} className="text-[12px] text-brand-light flex items-center">
                    <span className="text-brand-accent mr-2 text-lg leading-none">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-brand-primary p-6 rounded-xl text-white flex justify-between items-center">
                <div>
                    <h4 className="text-[13px] font-bold mb-1">Público Atendido</h4>
                    <p className="opacity-80 text-[11px]">Adultos e Crianças</p>
                </div>
                <div className="h-8 w-[1px] bg-white/20"></div>
                <div className="text-right">
                    <h4 className="text-[13px] font-bold mb-1">Atendimento</h4>
                    <p className="opacity-80 text-[11px]">Online & Presencial</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

