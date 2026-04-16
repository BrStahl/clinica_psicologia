import { useState } from "react";
import { motion } from "motion/react";
import { X, Send } from "lucide-react";

interface TherapyFormProps {
  onClose: () => void;
}

export default function TherapyForm({ onClose }: TherapyFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    whatsapp: "",
    motivo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp number: 5519993180955
    const phoneNumber = "5519993180955"; 
    
    const message = encodeURIComponent(
      `Olá Michele! Gostaria de agendar uma consulta.\n\n` +
      `*Dados do Paciente:*\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Idade:* ${formData.idade}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n\n` +
      `*Motivo do contato:*\n${formData.motivo}`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-secondary/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-brand-primary transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-serif text-brand-secondary mb-2">Solicitar Agendamento</h3>
            <p className="text-sm text-brand-light">Preencha as informações abaixo para iniciarmos seu acolhimento.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1.5 ml-1">
                Nome completo
              </label>
              <input
                required
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Como gostaria de ser chamado(a)?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1.5 ml-1">
                  Idade
                </label>
                <input
                  required
                  type="number"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  placeholder="Ex: 25"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1.5 ml-1">
                  WhatsApp
                </label>
                <input
                  required
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1.5 ml-1">
                Motivo do contato
              </label>
              <textarea
                required
                name="motivo"
                rows={4}
                value={formData.motivo}
                onChange={handleChange}
                placeholder="Conte-me um pouco sobre o que você está sentindo..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 mt-4"
            >
              Enviar pelo WhatsApp
              <Send size={18} />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
              Ao clicar em enviar, você será redirecionado para o WhatsApp para finalizar o agendamento diretamente com a Dra. Michele.
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
