import { motion } from "motion/react";
import { MapPin, Instagram, MessageCircle, ShieldCheck } from "lucide-react";

export default function Contact() {
  const healthPlans = [
    { name: "Medical Limeira" },
    { name: "Frei Galvão" },
  ];

  return (
    <section id="contact" className="p-10 lg:p-14 bg-brand-soft">
      <div className="max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-brand-primary font-bold uppercase tracking-[2px] text-xs mb-2">Contato</h2>
          <h3 className="text-3xl font-serif text-brand-secondary">Agende sua consulta</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-xl shadow-card border-t-4 border-brand-primary">
            <h4 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 border-b border-[#F0F0F0] pb-2 font-bold">Localização</h4>
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-brand-soft rounded-lg text-brand-primary">
                <MapPin size={20} />
              </div>
              <p className="text-[13px] text-brand-light leading-relaxed">
                Rua Farmaceutico Jacob Fanelli 139,<br />
                Vila Sao Joao, Limeira - SP<br />
                CEP: 13480-720
              </p>
            </div>
            
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Rua+Farmaceutico+Jacob+Fanelli+139+Limeira"
              target="_blank"
              className="inline-block text-[11px] font-bold text-brand-accent uppercase tracking-[1px] border-b border-brand-accent hover:text-brand-primary hover:border-brand-primary transition-all"
            >
              Ver no Google Maps
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-card border-t-4 border-brand-primary">
            <h4 className="text-xs uppercase tracking-[1px] text-brand-accent mb-6 border-b border-[#F0F0F0] pb-2 font-bold">Canais Digitais</h4>
            <div className="space-y-4">
              <a 
                href="https://wa.me/5519993180955" 
                target="_blank"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-brand-soft rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-light font-bold uppercase tracking-wider">WhatsApp</p>
                  <p className="text-[13px] text-brand-secondary font-medium">(19) 99318-0955</p>
                </div>
              </a>

              <a 
                href="https://instagram.com/psico.michelebraz" 
                target="_blank"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-brand-soft rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-light font-bold uppercase tracking-wider">Instagram</p>
                  <p className="text-[13px] text-brand-secondary font-medium">@psico.michelebraz</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-brand-primary text-white p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-lg">
                    <ShieldCheck size={24} className="text-brand-accent" />
                </div>
                <div>
                    <h4 className="text-[14px] font-bold">Convênios Aceitos</h4>
                    <p className="text-[12px] opacity-70">
                        {healthPlans.map(p => p.name).join(" • ")}
                    </p>
                </div>
            </div>
            <p className="text-[11px] text-white/60 italic max-w-xs text-center md:text-right">
                A cobertura varia conforme o local. Confirme durante o agendamento.
            </p>
        </div>
      </div>
    </section>
  );
}

