import { Heart, Users, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function HealthKnowledge() {
  const topics = [
    {
      title: "Comunicação Assertiva",
      description: "A base de um relacionamento saudável é a capacidade de falar e ouvir sem julgamentos.",
      icon: <MessageCircle className="text-brand-primary" size={24} />
    },
    {
      title: "Vínculo Afetivo",
      description: "Trabalhamos na reconexão emocional e no fortalecimento da amizade entre o casal.",
      icon: <Heart className="text-brand-primary" size={24} />
    },
    {
      title: "Resolução de Conflitos",
      description: "Ferramentas práticas para lidar com divergências de forma construtiva e respeitosa.",
      icon: <ShieldCheck className="text-brand-primary" size={24} />
    },
    {
      title: "Projetos em Comum",
      description: "Alinhamento de expectativas e construção de um futuro compartilhado com propósito.",
      icon: <Users className="text-brand-primary" size={24} />
    }
  ];

  return (
    <section id="knowledge" className="p-10 lg:p-14 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-soft rounded-3xl rotate-2"></div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <img 
                src="https://picsum.photos/seed/couples-therapy/800/600" 
                alt="Terapia de Casal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/10"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-[240px] border-l-4 border-brand-accent hidden md:block">
              <p className="text-brand-secondary font-serif italic text-sm">
                "O amor não consiste em olhar um para o outro, mas em olhar juntos na mesma direção."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-brand-accent mt-3 font-bold">— Antoine de Saint-Exupéry</p>
            </div>
          </div>

          <div>
            <h2 className="text-brand-primary font-bold uppercase tracking-[3px] text-xs mb-4">Saúde e Conhecimento</h2>
            <h3 className="text-4xl font-serif text-brand-secondary mb-6 leading-tight">A Arte de Construir <br/><span className="text-brand-primary italic">Relacionamentos Saudáveis.</span></h3>
            
            <p className="text-brand-light leading-relaxed mb-10 text-lg">
              A terapia de casal na abordagem Cognitivo-Comportamental busca identificar padrões de interação que geram sofrimento, auxiliando o casal a desenvolver novas habilidades de convivência.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {topics.map((topic, idx) => (
                <div key={idx} className="group">
                  <div className="mb-4 bg-brand-soft w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    {topic.icon}
                  </div>
                  <h4 className="font-serif text-brand-secondary text-lg mb-2">{topic.title}</h4>
                  <p className="text-brand-light text-sm leading-relaxed">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
