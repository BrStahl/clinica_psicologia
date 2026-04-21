export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-10 lg:p-14 bg-brand-soft border-t border-[#EDEDED]">
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-[18px] text-brand-primary leading-tight mb-1">
              Michele Cristina Braz da Silva
            </h2>
            <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">
              Psicóloga Clínica • CRP 06/147134
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-[11px] text-brand-light font-medium">
              © {currentYear} Todos os direitos reservados.
            </div>
            <a href="/login" className="text-[9px] text-brand-accent/50 hover:text-brand-primary transition-colors uppercase tracking-widest font-bold">
              Área Restrita
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

