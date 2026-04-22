import { CheckCircle2, AlertCircle } from "lucide-react";

export default function RelationalPain() {
  const painPoints = [
    "Se entrega demais e acaba se frustrando",
    "Tem medo de ser abandonado(a)",
    "Vive conflitos constantes",
    "Sente que não é compreendido(a)",
    "Percebe que repete os mesmos padrões",
    "Se sente inseguro(a) ou emocionalmente dependente",
  ];

  const helpPoints = [
    "Melhorar a comunicação",
    "Fortalecer sua autoestima",
    "Desenvolver segurança emocional",
    "Romper padrões que se repetem",
    "Construir relações mais saudáveis",
  ];

  return (
    <section className="p-10 lg:p-14 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Pain Points Side */}
          <div className="bg-brand-soft/50 p-8 lg:p-10 rounded-2xl border border-brand-primary/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
             
             <h3 className="text-2xl lg:text-3xl font-serif text-brand-secondary mb-8 relative z-10 leading-snug">
               Você se sente assim nos seus relacionamentos?
             </h3>
             
             <ul className="space-y-4 mb-8 relative z-10">
               {painPoints.map((point, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <div className="mt-1 flex-shrink-0 text-brand-accent">
                     <AlertCircle size={18} />
                   </div>
                   <span className="text-brand-light leading-relaxed">{point}</span>
                 </li>
               ))}
             </ul>
             
             <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-primary/5 inline-block relative z-10">
               <p className="text-brand-primary font-bold text-sm italic">
                 "Você não precisa passar por isso sozinho(a)."
               </p>
             </div>
          </div>

          {/* Help Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-brand-primary font-bold uppercase tracking-[3px] text-xs mb-4">Apoio Psicológico</h2>
            <h3 className="text-3xl font-serif text-brand-secondary mb-6">COMO POSSO TE AJUDAR</h3>
            
            <p className="text-brand-light leading-relaxed text-lg mb-8">
              A psicoterapia é um espaço de acolhimento e transformação, onde você pode compreender suas emoções, identificar padrões e construir novas formas de se relacionar.
            </p>
            
            <div className="bg-white">
               <p className="text-brand-secondary font-bold mb-4">No processo terapêutico, você poderá:</p>
               <ul className="space-y-4">
                 {helpPoints.map((point, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <div className="flex-shrink-0 text-[#25D366]">
                       <CheckCircle2 size={20} />
                     </div>
                     <span className="text-brand-light font-medium">{point}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
