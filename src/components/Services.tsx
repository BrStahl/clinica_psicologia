import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, User, Users, X, ArrowRight, Brain } from "lucide-react";

export default function Services() {
  const [selectedService, setSelectedService] = useState<null | number>(null);

  const services = [
    { 
      title: "Psicoterapia de Casal", 
      shortDesc: "Auxílio na comunicação, reconstrução da confiança e fortalecimento do vínculo afetivo.",
      fullDesc: "Atendimento psicológico para casais que desejam melhorar a comunicação, resolver conflitos, reconstruir a confiança e fortalecer o vínculo afetivo. A terapia de casal é indicada para momentos de crise, distanciamento emocional, ciúmes, dificuldades na convivência e problemas recorrentes na relação.\n\nO processo terapêutico auxilia na compreensão das dinâmicas do relacionamento, promovendo mudanças mais saudáveis e equilibradas entre o casal.",
      icon: <Users className="text-brand-primary" size={24} />
    },
    { 
      title: "Psicoterapia Adulto", 
      shortDesc: "Foco em ansiedade, depressão, autoestima e regulação emocional.",
      fullDesc: "Atendimento psicológico para adultos com foco em ansiedade, depressão, autoestima, regulação emocional e dificuldades no dia a dia.\n\nAtravés da abordagem Cognitivo-Comportamental (TCC), o processo terapêutico auxilia na identificação de pensamentos e comportamentos que impactam o bem-estar emocional, promovendo mudanças práticas e duradouras.",
      icon: <User className="text-brand-primary" size={24} />
    },
    { 
      title: "Psicoterapia Adolescente", 
      shortDesc: "Apoio emocional para desafios da adolescência, autoestima e relações sociais.",
      fullDesc: "Atendimento psicológico voltado para adolescentes, auxiliando em questões emocionais, comportamentais, autoestima, ansiedade, depressão e dificuldades nas relações familiares e sociais.\n\nO processo terapêutico promove o desenvolvimento emocional e o fortalecimento de habilidades para lidar com desafios dessa fase.",
      icon: <Heart className="text-brand-primary" size={24} />
    },
    { 
      title: "Terapia Cognitivo-Comportamental", 
      shortDesc: "Abordagem focada na reestruturação de pensamentos para mudanças duradouras.",
      fullDesc: "A Terapia Cognitivo-Comportamental (TCC) é uma abordagem terapêutica estruturada e focada no presente. O objetivo central é identificar e modificar padrões de pensamento e comportamentos que impactam o bem-estar emocional.\n\nÉ amplamente reconhecida pela sua eficácia no tratamento de diversos transtornos, como ansiedade e depressão, proporcionando ferramentas práticas para lidar com as dificuldades do dia a dia e promover uma vida equilibrada.",
      icon: <Brain className="text-brand-primary" size={24} />
    },
  ];

  const conditions = [
    "Ansiedade e Estresse", 
    "Depressão e Desânimo", 
    "Conflitos Relacionais", 
    "Baixa Autoestima",
    "Luto e Perdas",
    "Dificuldade de Comunicação"
  ];

  return (
    <section id="services" className="p-10 lg:p-14 bg-brand-soft scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-left">
            <h2 className="text-brand-primary font-bold uppercase tracking-[3px] text-sm mb-4">Como posso ajudar</h2>
            <h3 className="text-4xl font-serif text-brand-secondary">Especialidades de Atendimento</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-card cursor-pointer group flex flex-col h-full border border-transparent hover:border-brand-primary/10 transition-all"
              onClick={() => setSelectedService(idx)}
            >
              <div className="mb-6 bg-brand-soft w-14 h-14 flex items-center justify-center rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-serif text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors">{service.title}</h4>
              <p className="text-brand-light leading-relaxed mb-8 flex-grow">{service.shortDesc}</p>
              
              <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest mt-auto">
                Saiba Mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clinical Demands & Info Bar */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-card border border-brand-soft">
            <h3 className="text-sm uppercase tracking-[2px] text-brand-accent mb-8 font-bold border-b border-brand-soft pb-4">Demandas Clínicas</h3>
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {conditions.map((item, idx) => (
                <li key={idx} className="text-sm text-brand-light flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-brand-primary p-8 rounded-2xl text-white flex justify-between items-center shadow-xl shadow-brand-primary/20">
                <div>
                    <h4 className="text-sm font-bold mb-2 uppercase tracking-widest">Público Atendido</h4>
                    <p className="opacity-90 text-lg font-serif">Adultos e Adolescentes</p>
                </div>
                <div className="h-12 w-[1px] bg-white/20"></div>
                <div className="text-right">
                    <h4 className="text-sm font-bold mb-2 uppercase tracking-widest">Modalidade</h4>
                    <p className="opacity-90 text-lg font-serif">Online & Presencial</p>
                </div>
            </div>
            <div className="bg-brand-accent/10 border border-brand-accent/20 p-6 rounded-2xl">
              <p className="text-brand-secondary font-medium text-center italic">
                "A jornada para si mesmo começa com um único passo de coragem."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-secondary/80 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl p-10 lg:p-14 rounded-3xl shadow-2xl z-[210] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="text-brand-light hover:text-brand-primary transition-colors p-2 hover:bg-brand-soft rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-8 bg-brand-soft w-16 h-16 flex items-center justify-center rounded-2xl">
                {services[selectedService].icon}
              </div>

              <h2 className="text-3xl font-serif text-brand-secondary mb-8">{services[selectedService].title}</h2>
              
              <div className="text-brand-light leading-relaxed text-lg whitespace-pre-line">
                {services[selectedService].fullDesc}
              </div>

              <div className="mt-12 pt-8 border-t border-brand-soft">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-brand-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 text-sm uppercase tracking-widest w-full"
                >
                  Solicitar Agendamento
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

