import { Phone, MapPin, PlusCircle, BookText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Sobre Mim", href: "/#about" },
  { name: "Serviços", href: "/#services" },
  { name: "Depoimentos", href: "/#testimonials" },
  { name: "Blog", href: "/blog", isRoute: true },
  { name: "Contato", href: "/#contact" },
];

interface NavbarProps {
  onOpenForm: () => void;
}

export default function Navbar({ onOpenForm }: NavbarProps) {
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean) => {
    if (isRoute) return;
    
    if (location.pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-[#EDEDED] p-10 flex flex-col justify-between h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex">
      <div className="brand">
        <Link to="/" className="block mb-10 group">
          <h1 className="font-serif text-[22px] text-brand-primary leading-tight mb-1 group-hover:text-brand-accent transition-colors">
            Michele Cristina Braz da Silva
          </h1>
          <p className="text-[11px] uppercase tracking-[2px] text-brand-accent font-bold">
            Psicóloga Clínica
          </p>
        </Link>

        <nav>
          <ul className="space-y-5">
            {navLinks.map((link) => (
              <li key={link.name} className="flex items-center group">
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-brand-light group-hover:text-brand-primary flex items-center transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent border border-brand-accent mr-3 group-hover:bg-brand-accent transition-all"></span>
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm font-medium text-brand-light group-hover:text-brand-primary flex items-center transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent border border-brand-accent mr-3 group-hover:bg-brand-accent transition-all"></span>
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>


      <div className="contact-info">
        <div className="flex items-start gap-2 mb-4 p-3 bg-brand-soft rounded-lg border-l-2 border-brand-accent">
          <MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" />
          <div className="text-[12px] leading-snug text-brand-light">
            <strong className="text-brand-secondary block mb-0.5">Consultório Particular</strong>
            R. Farmaceutico Jacob Fanelli 139<br />
            Vila Sao Joao, Limeira - SP<br />
            CEP 13480-720
          </div>
        </div>
        
        <button 
          onClick={onOpenForm}
          className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/10 cursor-pointer"
        >
          <PlusCircle size={14} />
          Agendar Consulta
        </button>
      </div>
    </aside>
  );
}

