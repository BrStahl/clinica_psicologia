import { useState, useEffect } from "react";
import { Phone, MapPin, PlusCircle, BookText, Menu, X as CloseIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Sobre Mim", href: "/#about", id: "about" },
  { name: "Serviços", href: "/#services", id: "services" },
  { name: "Depoimentos", href: "/#testimonials", id: "testimonials" },
  { name: "Blog", href: "/blog", isRoute: true, id: "blog" },
  { name: "Contato", href: "/#contact", id: "contact" },
];

interface NavbarProps {
  onOpenForm: () => void;
}

export default function Navbar({ onOpenForm }: NavbarProps) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(location.pathname.includes("/blog") ? "blog" : "");
      return;
    }

    const handleScroll = () => {
      const sections = navLinks
        .filter(l => !l.isRoute)
        .map(l => document.getElementById(l.id || ""));
      
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (!section) continue;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
          return;
        }
      }
      
      if (window.scrollY < 100) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean) => {
    if (isRoute) return;
    setIsMobileMenuOpen(false);
    
    if (location.pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-[#EDEDED] fixed top-0 left-0 z-[100] h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group shrink-0"
        >
          <div>
            <h1 className="font-serif text-[16px] lg:text-[18px] text-brand-primary leading-tight group-hover:text-brand-accent transition-colors">
              Michele Cristina Braz da Silva
            </h1>
            <p className="text-[9px] uppercase tracking-[2px] text-brand-accent font-bold">
              Psicóloga e Terapeuta de Casais
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className={`text-sm font-medium transition-all relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-primary after:transition-all hover:text-brand-primary hover:after:w-full ${
                        isActive ? "text-brand-primary after:w-full" : "text-brand-light after:w-0"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-sm font-medium transition-all relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-primary after:transition-all hover:text-brand-primary hover:after:w-full ${
                        isActive ? "text-brand-primary after:w-full" : "text-brand-light after:w-0"
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenForm}
            className="hidden md:flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/10 cursor-pointer"
          >
            <PlusCircle size={14} />
            Agendar Consulta
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-brand-primary"
          >
            {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#EDEDED] py-6 px-6 shadow-xl animate-in fade-in slide-in-from-top-4">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm font-medium ${activeSection === link.id ? "text-brand-primary" : "text-brand-light"}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block text-sm font-medium ${activeSection === link.id ? "text-brand-primary" : "text-brand-light"}`}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-[#F0F0F0]">
              <button 
                onClick={() => {
                  onOpenForm();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                <PlusCircle size={14} />
                Agendar Consulta
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

