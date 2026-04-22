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
          <h2 className="font-serif text-[32px] text-brand-primary mb-2">Dra. Michele Braz</h2>
          <div className="w-16 h-1 bg-brand-accent"></div>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-10 mt-12 items-center">
          <div className="lg:col-span-3">
            <h1 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight mb-8">
              Fortalecendo Vínculos e Construindo <br/>
              <span className="italic text-brand-primary">Relações mais Saudáveis.</span>
            </h1>
            <p className="text-brand-light leading-relaxed text-lg mb-6 max-w-xl border-l-4 border-brand-accent pl-6 py-2 bg-white/50">
              Para casais e pessoas que se sentem machucados, desconectados ou presos em relações difíceis aendo este é um espaço de reconstrução, diálogo e reconexão emocional.
              A psicoterapia auxilia na transformação de padrões de conflito, fortalecendo vínculos e construindo relações mais saudáveis e seguras.
            </p>
            <div className="mb-10 max-w-xl">
              <p className="text-brand-secondary font-bold text-lg mb-1">
                Você não precisa continuar vivendo relações que te machucam.
              </p>
              <p className="text-brand-primary font-medium text-lg">
                👉 Agende sua sessão e inicie seu processo de transformação emocional.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openForm}
                className="bg-brand-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/30 text-sm uppercase tracking-widest cursor-pointer flex items-center gap-2"
              >
                Agendar Consulta
              </button>
              <a
                href="#services"
                className="px-10 py-4 rounded-lg font-bold border-2 border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-sm uppercase tracking-widest flex items-center"
              >
                Ver Serviços
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto lg:aspect-square rounded-full overflow-hidden shadow-xl border-8 border-white bg-white flex items-center justify-center p-6 lg:p-8 group max-w-sm">
              <img
                src="/logo.png"
                alt="Logo Michele Braz"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

