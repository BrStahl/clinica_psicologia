import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Clara Riboli",
      text: "A Michele é muito atenciosa e me ajudou a superar várias dificuldades. Em um momento de crise, ela me acolheu, me ligou e me deu todo o suporte que eu precisava.",
    },
    {
      name: "Matheus Pires",
      text: "Já me ajudou a reparar em padrões de comportamento, o que me ajudou muito a controlar a ansiedade que sentia. Ótimo consultório, super atenciosa.",
    },
    {
      name: "Juliana",
      text: "Michele me acolheu com muita empatia e individualidade durante meu tratamento, super dedicada e profissional. A cada sessão me sentia crescendo e evoluindo.",
    }
  ];

  return (
    <section id="testimonials" className="p-10 lg:p-14 bg-brand-soft">
      <div className="max-w-6xl">
        <div className="mb-10">
          <h2 className="text-brand-primary font-bold uppercase tracking-[2px] text-xs mb-2">Depoimentos</h2>
          <h3 className="text-3xl font-serif text-brand-secondary">O que dizem os pacientes</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F4F6F5] p-6 rounded-lg border border-[#EDEDED] flex flex-col justify-between"
            >
              <p className="text-[11px] text-brand-light leading-relaxed italic mb-4">
                "{item.text}"
              </p>
              <div className="pt-3 border-t border-brand-primary/5">
                <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
             <div className="bg-white/50 border border-brand-accent/20 px-4 py-2 rounded-full flex items-center gap-2">
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <div key={s} className="w-1 h-1 rounded-full bg-brand-accent"></div>)}
                 </div>
                 <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Excelência Verificada</span>
             </div>
        </div>
      </div>
    </section>
  );
}

