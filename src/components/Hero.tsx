import { useUI } from "../context/UIContext";

export default function Hero() {
  const { openForm } = useUI();
  return (
    <section id="home" className="p-10 lg:p-14 bg-brand-soft relative overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl relative z-10">
        <div className="mb-2">
          <h2 className="font-serif text-[32px] text-brand-primary mb-2">Cuidado e Desenvolvimento</h2>
          <div className="w-16 h-1 bg-brand-accent"></div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-10 mt-12 items-center">
          <div className="lg:col-span-3">
            <h1 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight mb-8">
              Sua saúde mental é a nossa <span className="italic text-brand-primary">prioridade.</span>
            </h1>
            <p className="text-brand-light leading-relaxed text-lg mb-10 max-w-xl italic border-l-4 border-brand-accent pl-6 py-2 bg-white/50">
              "Falar é uma necessidade, escutar é uma arte." — Johann Goethe
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openForm}
                className="bg-brand-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/30 text-sm uppercase tracking-wide cursor-pointer flex items-center gap-2"
              >
                Começar Terapia
              </button>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-lg font-bold border border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-sm uppercase tracking-wide"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
              <img
                src="https://picsum.photos/seed/psychology-office/800/1000"
                alt="Psicologia Clínica"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

