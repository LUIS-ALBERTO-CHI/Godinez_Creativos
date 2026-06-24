import { useState, useEffect } from 'react';
import { Share2, Sparkles, PenTool, Code2, Clapperboard, Target } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [salesHurdle, setSalesHurdle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSection, setActiveSection] = useState('inicio');

  // Sound chime synthesizer for micro-interactions (disabled)
  const playChime = (type: 'success' | 'click' | 'close') => {
    void type;
  };

  useEffect(() => {
    // Scroll-reveal observer
    const revealOptions = { root: null, rootMargin: '0px -5% -5% 0px', threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, revealOptions);
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    revealEls.forEach((el) => revealObserver.observe(el));

    // Active section observer — tracks which section is in viewport
    const sectionIds = ['inicio', 'servicios', 'diferencia', 'portafolio'];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      revealEls.forEach((el) => revealObserver.unobserve(el));
      sectionObserver.disconnect();
    };
  }, []);

  const openJoinModal = (initialService?: string | React.MouseEvent) => {
    if (initialService && typeof initialService === 'string') {
      setSalesHurdle(`Me interesa el servicio de: ${initialService}`);
    } else {
      setSalesHurdle('');
    }
    setIsModalOpen(true);
  };

  const services = [
    {
      title: "Social Media",
      desc: "Hacemos que la gente hable de ti. Llenamos tus redes de contenido que engancha de verdad y convierte a simples seguidores en fans y clientes leales.",
      icon: <Share2 strokeWidth={1.5} />,
      badge: "MÁS SEGUIDORES Y CLIENTES"
    },
    {
      title: "Branding",
      desc: "Le damos una cara bonita y una personalidad única a tu negocio. Logotipos, colores y diseños memorables para que no te parezcas a nadie más.",
      icon: <Sparkles strokeWidth={1.5} />,
      badge: "DISEÑO DE MARCA ÚNICA"
    },
    {
      title: "Diseño Gráfico",
      desc: "Creamos imágenes y publicaciones tan llamativas que tus clientes no podrán evitar detenerse a verlas mientras deslizan su pantalla.",
      icon: <PenTool strokeWidth={1.5} />,
      badge: "IMÁGENES QUE ATRAEN"
    },
    {
      title: "Desarrollo Web",
      desc: "Creamos páginas web rápidas, sencillas de usar y muy atractivas que funcionan perfecto en celulares y están listas para vender tus servicios.",
      icon: <Code2 strokeWidth={1.5} />,
      badge: "TU SITIO WEB PERFECTO"
    },
    {
      title: "Contenido Creativo",
      desc: "Hacemos videos entretenidos en TikTok y Reels que se vuelven populares y textos ingeniosos que convencen a cualquiera de comprarte.",
      icon: <Clapperboard strokeWidth={1.5} />,
      badge: "VIDEOS Y TEXTOS DIVERTIDOS"
    },
    {
      title: "Estrategia Digital",
      desc: "Ponemos tus anuncios frente a las personas indicadas para que cada centavo que inviertas se traduzca en nuevas llamadas, mensajes y ventas.",
      icon: <Target strokeWidth={1.5} />,
      badge: "ANUNCIOS EFECTIVOS"
    }
  ];

  const projects = [
    {
      title: "Nova Coffee",
      category: "Branding",
      desc: "Identidad visual y empaques minimalistas para café de especialidad.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#2a0c1a] to-[#0e0208] flex flex-col items-center justify-center p-6 relative">
          {/* Subtle circle mesh */}
          <div className="absolute w-36 h-36 rounded-full border border-[#f60566]/20 pulse-ring-slow"></div>
          {/* Abstract coffee bag silhouette built of modern vector rectangles */}
          <div className="w-20 h-32 bg-gradient-to-t from-[#f60566]/25 to-white/5 border border-[#f60566]/40 rounded-xl flex flex-col justify-between p-3.5 z-10 shadow-lg group-hover:scale-105 transition-transform duration-500">
            <div className="w-6 h-1.5 bg-[#f60566]/60 rounded-full"></div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#f60566] inline-block shadow-[0_0_8px_#f60566]"></span>
              <span className="text-[6px] font-mono tracking-widest text-white/50">NOVA</span>
            </div>
            <div className="w-full h-1 bg-[#00f0ff]/30 rounded-full"></div>
          </div>
          {/* Floating vector beans */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#f60566]/30 border border-[#f60566]/50 floating-gentle"></div>
          <div className="absolute bottom-1/4 left-1/4 w-2.5 h-2.5 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 floating-gentle-reverse"></div>
        </div>
      )
    },
    {
      title: "Vanta Studio",
      category: "Web Design",
      desc: "Portafolio digital e interfaz de diseño arquitectónico 3D.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#0c0f18] to-[#04060b] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
          {/* Wireframe box layout */}
          <div className="w-40 h-24 rounded-lg border border-[#00f0ff]/40 bg-black/75 p-2 flex flex-col justify-between relative shadow-lg group-hover:rotate-1 transition-transform duration-500 z-10">
            <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-[5px] font-mono text-white/30 uppercase tracking-widest">vanta.studio</span>
            </div>
            {/* 3D wireframe mesh simulation */}
            <div className="flex-grow flex items-center justify-center py-1">
              <svg className="w-12 h-12 text-[#00f0ff]/40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex justify-between items-center text-[5px] font-mono text-white/40">
              <span>ACTIVE LAYOUT</span>
              <span className="text-[#00f0ff]">3D CORE</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Lunar Fit",
      category: "Social Media",
      desc: "Estrategia visual y feed dinámico para marca de bienestar.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#1e072b] to-[#0c0214] flex items-center justify-center p-6 relative">
          <div className="absolute top-1/2 left-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f60566]/5 blur-2xl"></div>
          {/* Vertical phone screen representing dynamic feed */}
          <div className="w-24 h-40 bg-[#0f0418] border border-[#f60566]/40 rounded-[20px] p-2 flex flex-col gap-2 relative shadow-lg group-hover:-translate-y-1 transition-transform duration-500 z-10 overflow-hidden">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-8 h-1 bg-white/35 rounded-full"></div>
            </div>
            {/* Circular fitness rings */}
            <div className="flex-grow flex items-center justify-center relative">
              <div className="w-14 h-14 rounded-full border border-dashed border-[#f60566]/30 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-[#f60566] flex items-center justify-center shadow-[0_0_10px_rgba(246,5,102,0.3)]">
                  <div className="w-6 h-6 rounded-full border border-[#00f0ff] animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-white/20 rounded-full"></div>
              <div className="w-2/3 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Zento",
      category: "Desarrollo Web",
      desc: "Plataforma e-commerce optimizada para conversiones.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#021815] to-[#010908] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,240,255,0.06),transparent_60%)]"></div>
          {/* E-commerce transaction dashboard representation */}
          <div className="w-36 h-28 rounded-lg border border-[#00f0ff]/30 bg-black/60 p-3 flex flex-col justify-between shadow-lg group-hover:scale-[1.03] transition-transform duration-500 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]"></div>
                <span className="text-[5px] font-mono text-[#00f0ff] uppercase tracking-wider font-bold">ZENTO CHECKOUT</span>
              </div>
              <span className="text-[6px] font-mono text-white/30">99.8% UP</span>
            </div>
            {/* Sales visual chart bar outline */}
            <div className="space-y-1.5 py-1">
              <div className="flex items-end gap-1 h-8 justify-around">
                <div className="w-2 h-3 bg-white/10 rounded-sm"></div>
                <div className="w-2 h-5 bg-white/20 rounded-sm"></div>
                <div className="w-2 h-4 bg-white/15 rounded-sm"></div>
                <div className="w-2 h-7 bg-[#00f0ff]/70 rounded-sm shadow-[0_0_8px_#00f0ff]"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[5px] font-mono text-white/40">
              <span>LOAD TIME: 0.12s</span>
              <span className="text-[#10b981] font-bold">SEO RATED A</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Aurea Skin",
      category: "Contenido Creativo",
      desc: "Dirección de arte y campaña digital de cosmética de lujo.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#260f1b] to-[#0f030a] flex items-center justify-center p-6 relative">
          {/* Decorative fluid neon spots for beauty theme */}
          <div className="absolute top-1/4 left-1/4 w-28 h-28 rounded-full bg-[#f60566]/10 blur-xl pointer-events-none"></div>
          {/* Overlapping aesthetic shapes representing cosmetic layout */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute w-20 h-28 rounded-full border border-[#f60566]/30 rotate-12 flex items-center justify-center">
              <div className="w-16 h-24 rounded-full border-2 border-[#f60566]/50 shadow-[0_0_15px_rgba(246,5,102,0.2)]"></div>
            </div>
            <div className="absolute w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center shadow-md floating-gentle">
              <span className="text-[6px] font-mono font-bold text-white tracking-widest">AUREA</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Flux Media",
      category: "Concept Projects",
      desc: "Rediseño conceptual y dirección de arte para reproductor musical.",
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#071329] to-[#020712] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_80%)]"></div>
          {/* Audio interface visualization mockup */}
          <div className="w-36 h-26 rounded-xl border border-white/10 bg-black/75 p-3 flex flex-col justify-between shadow-lg group-hover:scale-105 transition-transform duration-500 z-10">
            <div className="flex justify-between items-center">
              <span className="text-[5px] font-mono text-white/40 uppercase font-bold tracking-widest">FLUX MUSIC PLAYER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]"></span>
            </div>
            {/* Waveform lines */}
            <div className="flex items-center gap-1 justify-center py-2">
              <div className="w-1 h-3 bg-[#f60566] rounded-full shadow-[0_0_5px_#f60566]"></div>
              <div className="w-1 h-5 bg-[#00f0ff] rounded-full shadow-[0_0_5px_#00f0ff] animate-pulse"></div>
              <div className="w-1 h-7 bg-white rounded-full"></div>
              <div className="w-1 h-4 bg-[#f60566] rounded-full shadow-[0_0_5px_#f60566]"></div>
              <div className="w-1 h-2 bg-[#00f0ff] rounded-full shadow-[0_0_5px_#00f0ff]"></div>
            </div>
            <div className="flex justify-between items-center text-[5px] font-mono text-white/40">
              <span>CONCEPT OS</span>
              <span>128BPM</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const closeJoinModal = () => {
    playChime('close');
    setIsModalOpen(false);
    setClientName('');
    setContactInfo('');
    setSalesHurdle('');
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !contactInfo) return;
    playChime('success');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setClientName('');
      setContactInfo('');
      setSalesHurdle('');
      triggerToast('🎉 ¡Campaña agendada! Nos pondremos en contacto contigo en menos de 24 horas.');
    }, 2000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black select-none">
      {/* Grid Overlay & Ambient Lights */}
      <div className="mesh-grid"></div>
      <div className="ambient-orb orb-cherry-left"></div>
      <div className="ambient-orb orb-cherry-main"></div>

      {/* Navigation Header — Floating Pill (exact reference match) */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between px-5 py-2 rounded-full bg-[#111] border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">

          {/* LEFT: Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/icon.jpeg"
              alt="Godínez Creativos"
              className="h-7 w-7 rounded-full object-cover border border-white/20"
            />
            <span className="text-white font-extrabold tracking-wider uppercase font-outfit text-xs hidden sm:inline-block">
              Godínez <span className="text-[#f60566]">Creativos</span>
            </span>
          </a>

          {/* CENTER: Nav links — active section gets white pill */}
          <div className="hidden lg:flex items-center gap-1">
            {([
              { label: 'Inicio',           href: '#inicio',     id: 'inicio' },
              { label: '¿Qué hacemos?',    href: '#servicios',  id: 'servicios' },
              { label: '¿Por qué nosotros?', href: '#diferencia', id: 'diferencia' },
              { label: 'Portafolio',       href: '#portafolio', id: 'portafolio' },
            ] as const).map(({ label, href, id }) => (
              <a
                key={id}
                href={href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-white text-black font-bold'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={(e) => { e.preventDefault(); openJoinModal(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeSection === 'contacto'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/65 hover:text-white'
              }`}
            >
              Contacto
            </button>
          </div>

          {/* RIGHT: Contact pill button + mobile hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openJoinModal()}
              className="hidden lg:block px-5 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors duration-150 active:scale-95"
            >
              Comenzar
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => { playChime('click'); setIsMobileMenuOpen(!isMobileMenuOpen); }}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/15 text-white active:scale-95 transition-all duration-150"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Hamburger Menu Drawer Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'menu-active' : ''}`}>
        {/* Cherry and Cyan ambient glows inside mobile drawer */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#f60566]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none"></div>

        {/* Drawer Header */}
        <div className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-20">
          <div className="flex items-center text-sm font-semibold tracking-wide text-white/90">
            <img
              src="/icon.jpeg"
              alt="Godínez Creativos"
              className="h-8 w-8 rounded-full object-cover border border-white/10"
            />
          </div>
          <button
            onClick={() => { playChime('close'); setIsMobileMenuOpen(false); }}
            className="flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-[#f60566]/30 text-white hover:border-[#f60566] active:scale-95 transition-all duration-300"
            aria-label="Cerrar Menú"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-col w-full max-w-md px-6 gap-4 z-10 relative">
          {[
            { name: 'Inicio', desc: 'Página central / Home', href: '#' },
            { name: '¿Qué hacemos?', desc: 'Nuestros superpoderes creativos', href: '#servicios' },
            { name: '¿Por qué nosotros?', desc: 'Nuestro valor diferencial', href: '#diferencia' },
            { name: 'Portafolio', desc: 'Explora nuestros proyectos', href: '#portafolio' },
            { name: 'Contacto', desc: 'Hablemos de tu proyecto', href: '#', action: openJoinModal }
          ].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (item.action) {
                  e.preventDefault();
                  item.action();
                }
              }}
              className="mobile-menu-item glass-panel group flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:border-[#f60566]/40 active:scale-[0.98] transition-all duration-300"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-lg font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors">{item.name}</span>
                <span className="text-xs text-white/50 font-light">{item.desc}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#f60566]/40 group-hover:bg-[#f60566]/10 text-white/70 group-hover:text-[#f60566] transition-all duration-300">
                <svg className="w-4 h-4 text-white/70 group-hover:text-[#f60566] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}

          {/* Drawer CTA button */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }}
            className="mobile-menu-item mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#f60566] to-[#ff0068] hover:from-[#ff0068] hover:to-[#ff2e93] text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(246,5,102,0.4)] active:scale-95 text-center flex items-center justify-center gap-2 border border-white/10"
            style={{ animationDelay: '0.45s' }}
          >
            <span>COMENZAR PROYECTO</span>
            <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-6 left-0 w-full px-6 flex flex-col items-center gap-3 z-10">
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/18omatXk9k/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-[#f60566] hover:border-[#f60566]/40 transition-all active:scale-90" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-[#f60566] hover:border-[#f60566]/40 transition-all active:scale-90" aria-label="Contacto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <p className="text-[9px] font-mono tracking-widest text-white/30 uppercase">© 2026 GODÍNEZ CREATIVOS</p>
        </div>
      </div>

      {/* Main Core Hero Content */}
      <main id="inicio" className="relative z-10 flex flex-col justify-between min-h-screen pt-28 pb-6 md:pt-36">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 max-w-7xl w-full mx-auto gap-12 lg:gap-6 flex-grow">

          {/* LEFT COLUMN: Texts & CTAs */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left z-10 relative flex flex-col items-center lg:items-start">
            <div className="space-y-4 w-full">
              <h1 className="text-[36px] sm:text-[56px] md:text-[66px] lg:text-[52px] xl:text-[70px] font-extrabold tracking-tight leading-[1.05] mx-auto lg:mx-0 drop-shadow-[0_0_25px_rgba(246,5,102,0.35)] select-none uppercase font-outfit">
                <span className="text-white">Godínez</span> <br />
                <span className="text-[#f60566]">Creativos</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-[#f60566] tracking-[0.22em] uppercase letter-spacing-wide leading-relaxed">
                MARCAS QUE SE VEN DIFERENTES<br className="sm:hidden" /> VENDEN DIFERENTE.
              </p>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
              Impulsamos marcas con creatividad, estrategia y tecnología. Convertimos ideas en experiencias digitales que conectan, atraen y generan resultados reales.
            </p>

            {/* Futuristic pill buttons - Stretches perfectly on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full max-w-xs sm:max-w-none">
              {/* Pill Button 1 */}
              <button
                onClick={openJoinModal}
                className="group relative flex items-center justify-between w-full sm:w-52 px-6 py-3.5 rounded-full glass-panel hover:border-[#f60566]/50 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Descubrir</span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:bg-[#f60566]/20 group-hover:text-[#f60566] transition-colors font-mono font-bold">••</span>
              </button>

              {/* Pill Button 2 */}
              <a
                href="https://www.facebook.com/share/18omatXk9k/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1b0511]/85 border border-[#f60566]/35 hover:border-[#f60566] text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(230,31,100,0.15)] hover:shadow-[0_0_30px_rgba(230,31,100,0.3)]"
              >
                {/* Facebook styled icon */}
                <svg className="w-4 h-4 text-[#f60566] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
                <span>Conectemos</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Holographic Mascot Frame - Giant & Backdrop positioned like the mockup */}
          <div className="w-full lg:w-[55vw] flex items-end justify-center relative min-h-[220px] sm:min-h-[300px] md:min-h-[500px] lg:absolute lg:right-0 lg:bottom-[92px] lg:top-0 lg:z-0 lg:pointer-events-none mt-4 lg:mt-0">

            {/* Glowing Backdrop Circle behind mascot */}
            <div className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-t from-[#f60566]/12 via-[#f60566]/4 to-transparent blur-3xl pointer-events-none"></div>

            {/* Mascot Image Container with Cybernetic Visor - Giant & Borderless */}
            <div className="relative w-full h-[25vh] sm:h-[35vh] md:h-[50vh] lg:h-[85vh] max-h-[220px] sm:max-h-[300px] md:max-h-[500px] lg:max-h-[850px] flex items-end justify-center lg:justify-end transition-all duration-500 floating-subtle">
              <img
                src="mascota.png"
                alt="Cyber Godínez Mascot"
                className="h-full w-auto object-contain object-bottom grayscale-[5%] brightness-[92%] hover:scale-[1.03] transition-transform duration-700 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Logo Ribbon (Infinite scrolling marquee for premium mobile/desktop experience) */}
        <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md relative z-25 mt-8 py-4 md:py-6 px-0 overflow-hidden">
          <div className="marquee-container max-w-7xl mx-auto">
            {/* The double content creates the infinite looping effect */}
            <div className="marquee-content animate-marquee">
              {[
                { name: 'Illustrator', src: '/adobe-illustrator-seeklogo.svg', alt: 'Adobe Illustrator' },
                { name: 'After Effects', src: '/adobe-after-effects-seeklogo.png', alt: 'Adobe After Effects' },
                { name: 'Canva', src: '/canva-seeklogo.svg', alt: 'Canva' },
                { name: 'Meta Ads', src: '/meta-icon-new-facebook-2021-seeklogo.svg', alt: 'Meta Ads' },
                { name: 'CapCut', src: '/capcut-seeklogo-2.svg', alt: 'CapCut' }
              ].map((logo, idx) => (
                <div key={`${logo.name}-1-${idx}`} className="group flex items-center gap-1.5 md:gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-5 md:h-8 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="text-xs md:text-sm font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">{logo.name}</span>
                </div>
              ))}
              {/* Duplicate the array to allow infinite seamless marquee scroll */}
              {[
                { name: 'Illustrator', src: '/adobe-illustrator-seeklogo.svg', alt: 'Adobe Illustrator' },
                { name: 'After Effects', src: '/adobe-after-effects-seeklogo.png', alt: 'Adobe After Effects' },
                { name: 'Canva', src: '/canva-seeklogo.svg', alt: 'Canva' },
                { name: 'Meta Ads', src: '/meta-icon-new-facebook-2021-seeklogo.svg', alt: 'Meta Ads' },
                { name: 'CapCut', src: '/capcut-seeklogo-2.svg', alt: 'CapCut' }
              ].map((logo, idx) => (
                <div key={`${logo.name}-2-${idx}`} className="group flex items-center gap-1.5 md:gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-5 md:h-8 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="text-xs md:text-sm font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SECTION: ¿Qué hacemos? */}
      <section
        id="servicios"
        className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-white/5 bg-black/35 backdrop-blur-sm overflow-hidden"
      >
        {/* Ambient background light orbs for orbital neon depth */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#f60566]/5 blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f60566]/40 bg-[#f60566]/15 text-[10px] font-mono tracking-[0.25em] text-white font-semibold uppercase animate-pulse shadow-[0_0_15px_rgba(246,5,102,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f60566] inline-block shadow-[0_0_8px_#f60566]"></span>
              Nuestros Superpoderes
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase">
              ¿Qué <span className="text-[#f60566]">hacemos</span>?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl">
              Fórmula única: unimos la chispa y dinamismo de la <strong className="text-[#f60566] font-semibold">Community Manager</strong>, la disrupción estética del <strong className="text-white font-semibold">Diseñador</strong> y la agilidad de vanguardia del <strong className="text-[#00f0ff] font-semibold">Programador Web</strong> para hackear las ventas de tu marca.
            </p>
          </div>

          {/* Services — Clean card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className={`group relative flex flex-col gap-4 p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  idx === 0
                    ? 'bg-[#f60566] border-[#f60566] shadow-[0_0_40px_rgba(246,5,102,0.3)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${
                  idx === 0
                    ? 'bg-white/20 [&>svg]:text-white'
                    : 'bg-[#f60566]/10 border border-[#f60566]/20 [&>svg]:text-[#f60566]'
                }`}>
                  {svc.icon}
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold leading-tight tracking-tight ${
                  idx === 0 ? 'text-white' : 'text-white'
                }`}>
                  {svc.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed flex-1 ${
                  idx === 0 ? 'text-white/80' : 'text-white/60'
                }`}>
                  {svc.desc}
                </p>

                {/* Link */}
                <div className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  idx === 0
                    ? 'text-white/90 group-hover:text-white'
                    : 'text-white/35 group-hover:text-[#f60566]'
                }`}>
                  <span>Comenzar</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Call to Action Banner */}
          <div className="mt-16 md:mt-24 glass-panel border border-[#f60566]/15 hover:border-[#f60566]/35 p-8 md:p-12 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 relative overflow-hidden bg-gradient-to-r from-[#15020a]/80 to-[#0c0106]/90 group shadow-[0_0_35px_rgba(246,5,102,0.04)] hover:shadow-[0_0_50px_rgba(246,5,102,0.15)]">
            {/* Soft decorative neon glow underlay */}
            <div className="absolute top-0 left-1/4 w-[250px] h-[250px] rounded-full bg-[#f60566]/5 blur-3xl pointer-events-none group-hover:bg-[#f60566]/10 transition-all duration-700"></div>
            <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none group-hover:bg-[#00f0ff]/10 transition-all duration-700"></div>

            <div className="space-y-3.5 text-center md:text-left z-10 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-[#00f0ff] uppercase">
                PROYECTOS CON PROPÓSITO
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                ¿Listo para crear algo <span className="text-gradient-cherry">legendario</span>?
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl leading-relaxed">
                Nuestro colectivo digital de CM, Diseñador y Desarrollador hackea la forma de hacer marketing para entregar resultados comerciales exponenciales.
              </p>
            </div>

            <button
              onClick={openJoinModal}
              className="z-10 group/btn flex items-center justify-between w-full md:w-60 px-7 py-4.5 rounded-full bg-gradient-to-r from-[#f60566] to-[#ff0068] text-white font-bold text-sm tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(246,5,102,0.3)] hover:shadow-[0_0_35px_rgba(246,5,102,0.5)] shrink-0 border border-white/10 uppercase"
            >
              <span>TRABAJAR JUNTOS</span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover/btn:translate-x-1 transition-transform">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: No somos una agencia tradicional */}
      <section
        id="diferencia"
        className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-white/5 bg-black/25 backdrop-blur-sm overflow-hidden"
      >
        {/* Ambient background light orbs for depth */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-[#f60566]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/15 text-[10px] font-mono tracking-[0.25em] text-white font-semibold uppercase animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] inline-block shadow-[0_0_8px_#00f0ff]"></span>
              Por Qué Somos Diferentes
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase">
              No somos una <span className="text-[#f60566]">agencia</span> tradicional.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl">
              Creamos diseño, contenido y experiencias digitales que hacen que las marcas se vean más grandes, modernas y profesionales.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* CARD 1: Atención directa (col-span-1) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] reveal-on-scroll reveal-delay-100">
              <div className="bento-card-glow-pink -top-10 -left-10 group-hover:scale-125"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Upper row: icon and status indicator */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#f60566]/15 border border-[#f60566]/30 flex items-center justify-center group-hover:bg-[#f60566] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(246,5,102,0.15)]">
                    <svg className="w-6 h-6 text-[#f60566] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shadow-[0_0_8px_#00f0ff]"></span>
                    <span className="text-[9px] font-mono tracking-widest text-white/70 uppercase">CANAL DIRECTO</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                    Atención directa
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                    Hablas directamente con quienes crean tu proyecto.
                  </p>
                </div>
              </div>

              {/* Graphical Visual Element in Card */}
              <div className="relative h-20 w-full flex items-center justify-center bg-black/50 rounded-2xl border border-white/10 overflow-hidden group-hover:border-[#f60566]/40 transition-colors duration-500 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f60566]/10 via-transparent to-[#00f0ff]/10"></div>
                <div className="flex items-center gap-6 z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#f60566] font-extrabold tracking-wider">TÚ</span>
                    <div className="w-8 h-8 rounded-full bg-[#f60566]/30 border border-[#f60566]/50 flex items-center justify-center text-xs text-white font-extrabold shadow-[0_0_10px_rgba(246,5,102,0.2)]">U</div>
                  </div>
                  <div className="flex items-center relative w-16">
                    <div className="w-full h-[1.5px] bg-gradient-to-r from-[#f60566] to-[#00f0ff] relative shadow-[0_0_8px_#f60566]">
                      <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-[marquee-scroll_3s_linear_infinite] left-0"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#00f0ff] font-extrabold tracking-wider">EQUIPO</span>
                    <div className="w-8 h-8 rounded-full bg-[#00f0ff]/30 border border-[#00f0ff]/50 flex items-center justify-center text-xs text-white font-extrabold shadow-[0_0_10px_rgba(0,240,255,0.2)]">GC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Diseño con intención (col-span-1 lg:col-span-2) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] lg:col-span-2 reveal-on-scroll reveal-delay-200">
              <div className="bento-card-glow-pink top-10 right-10 group-hover:scale-125"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-grow">
                {/* Text Content */}
                <div className="space-y-4 lg:col-span-7 z-10">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-[#f60566]/15 border border-[#f60566]/30 text-[9px] font-mono tracking-widest text-[#f60566] uppercase shadow-[0_0_10px_rgba(246,5,102,0.15)]">
                    100% PERSONALIZADO
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                      Diseño con intención
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                      No hacemos contenido genérico ni plantillas aburridas.
                    </p>
                  </div>
                </div>

                {/* High-Impact Visual Graphic Element */}
                <div className="lg:col-span-5 relative w-full h-[180px] bg-black/50 rounded-[24px] border border-white/10 overflow-hidden flex items-center justify-center group-hover:border-[#f60566]/40 transition-all duration-500 shadow-inner">
                  {/* Subtle Grid behind layouts */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                  
                  {/* Visual card stack representation */}
                  <div className="relative w-full max-w-[200px] h-[120px] flex items-center justify-center">
                    {/* Fake Generic Template Card - Behind, dull, crossed out */}
                    <div className="absolute w-[130px] h-[80px] rounded-xl bg-[#1a1115]/95 border border-white/15 opacity-40 -translate-x-8 -translate-y-4 -rotate-6 flex flex-col justify-between p-2 select-none pointer-events-none shadow-md">
                      <div className="w-8 h-2 bg-white/30 rounded"></div>
                      <div className="space-y-1">
                        <div className="w-16 h-1.5 bg-white/20 rounded"></div>
                        <div className="w-12 h-1.5 bg-white/20 rounded"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl text-red-500 font-extrabold drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]">✕</span>
                      </div>
                    </div>

                    {/* Godinez Premium Card - Foreground, vibrant, floating */}
                    <div className="absolute w-[150px] h-[95px] rounded-xl bg-gradient-to-br from-[#3d031e] to-[#15020a] border border-[#f60566]/70 shadow-[0_12px_35px_rgba(246,5,102,0.45)] translate-x-4 translate-y-2 rotate-3 flex flex-col justify-between p-3 transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-105 floating-gentle z-10">
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-2 bg-[#f60566]/60 rounded shadow-[0_0_5px_#f60566]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-20 h-2 bg-white/80 rounded"></div>
                        <div className="w-16 h-1.5 bg-white/45 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center text-[8px] font-mono text-white/50 font-bold">
                        <span>ESTÉTICA PRO</span>
                        <svg className="w-4 h-4 text-[#f60566] animate-pulse shadow-[0_0_8px_#f60566]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c-.191-.397-.736-.397-.927 0l-2.184 4.545-5.008.083c-.442.007-.62.556-.292.848l3.61 3.197-1.12 4.963c-.098.435.374.777.756.54l4.475-2.793 4.475 2.793c.382.237.854-.105.756-.54l-1.12-4.963 3.61-3.197c.328-.292.15-.841-.292-.848l-5.008-.083L11.48 3.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Desarrollo moderno (col-span-1 lg:col-span-2) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] lg:col-span-2 reveal-on-scroll reveal-delay-300">
              <div className="bento-card-glow-cyan top-10 left-10 group-hover:scale-125"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-grow">
                {/* High-Impact Visual Graphic Element */}
                <div className="lg:col-span-5 relative w-full h-[180px] bg-[#0c0107]/95 rounded-[24px] border border-[#00f0ff]/30 overflow-hidden flex flex-col p-4 justify-between group-hover:border-[#00f0ff]/50 transition-all duration-500 order-last lg:order-first shadow-lg">
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                    </div>
                    <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest font-extrabold">VITE TERMINAL</span>
                  </div>

                  {/* Highlights code visualization */}
                  <div className="console-code select-none pointer-events-none mt-2">
                    <span className="comment">// Optimizando carga web</span><br />
                    <span className="keyword">import</span> &#123; speed &#125; <span className="keyword">from</span> <span className="string">"godinez"</span>;<br />
                    <span className="keyword">const</span> performance = <span className="function">load</span>(); <br />
                    <span className="keyword">if</span> (performance === <span className="string">"slow"</span>) &#123; <span className="function">destroy</span>(); &#125;
                  </div>

                  {/* Metrics Row */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-2">
                    <span className="text-[10px] font-mono text-[#00f0ff] font-extrabold drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">SPEED: 99/100</span>
                    <span className="text-[10px] font-mono text-[#10b981] font-extrabold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">SEO ACTIVE</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 lg:col-span-7 z-10">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/30 text-[9px] font-mono tracking-widest text-[#00f0ff] uppercase shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                    RENDIMIENTO Y SEO
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-[#00f0ff] transition-colors duration-300">
                      Desarrollo moderno
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                      Sitios rápidos, visuales y diseñados para convertir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: Ideas frescas (col-span-1) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] reveal-on-scroll reveal-delay-400">
              <div className="bento-card-glow-pink -top-10 -right-10 group-hover:scale-125"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Upper row: icon and date badge */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#f60566]/15 border border-[#f60566]/30 flex items-center justify-center group-hover:bg-[#f60566] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(246,5,102,0.15)]">
                    <svg className="w-6 h-6 text-[#f60566] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono tracking-widest text-white/70 uppercase">
                    MINDSET ACTIVO
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                    Ideas frescas
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                    Somos una agencia nueva con mentalidad actual.
                  </p>
                </div>
              </div>

              {/* Graphic element representing freshness */}
              <div className="relative h-20 w-full flex items-center justify-center bg-black/50 rounded-2xl border border-white/10 overflow-hidden group-hover:border-[#f60566]/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-[#f60566]/15 to-transparent"></div>
                <span className="text-3xl font-extrabold tracking-widest text-white/30 select-none group-hover:text-[#f60566]/40 group-hover:scale-105 transition-all duration-500 font-mono">EST. 2026</span>
                <div className="absolute bottom-2 flex items-center gap-1.5 text-[8px] font-mono text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f60566] shadow-[0_0_5px_#f60566]"></span>
                  <span>CONEXIÓN CON TENDENCIAS ACTUALES</span>
                </div>
              </div>
            </div>

            {/* CARD 5: Estrategia + creatividad (col-span-1) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] reveal-on-scroll reveal-delay-100">
              <div className="bento-card-glow-pink -bottom-10 -right-10 group-hover:scale-125"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Upper row: icon and status indicator */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#f60566]/15 border border-[#f60566]/30 flex items-center justify-center group-hover:bg-[#f60566] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(246,5,102,0.15)]">
                    <svg className="w-6 h-6 text-[#f60566] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-mono tracking-widest text-white/70 uppercase">
                    DISEÑO CON PROPÓSITO
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                    Estrategia + creatividad
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                    No solo hacemos que se vea bien; hacemos que funcione.
                  </p>
                </div>
              </div>

              {/* Graphic element representing integration of strategy and creativity */}
              <div className="relative h-20 w-full flex items-center justify-around bg-black/50 rounded-2xl border border-white/10 overflow-hidden group-hover:border-[#f60566]/30 transition-all duration-500 px-4 shadow-inner">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-white/50 font-bold">ESTRATEGIA</span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-[#00f0ff] group-hover:rotate-90 transition-transform duration-700 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.99l1.004.831a1.125 1.125 0 01.26 1.43l-1.297 2.247a1.125 1.125 0 01-1.37.491l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.83c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.831a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="h-[1.5px] bg-gradient-to-r from-[#00f0ff] to-[#f60566] w-12 relative shadow-[0_0_8px_#f60566]">
                  <div className="absolute -top-1 left-5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping"></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-white/50 font-bold">CREATIVIDAD</span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-[#f60566] group-hover:scale-110 transition-transform duration-500 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l5.096-.813a2 2 0 001.414-.586l6.096-6.096a2 2 0 00-.707-3.414l-5.096-.813a2 2 0 00-1.414.586L9.227 15.904a2 2 0 00-.586 1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 6: Equipo multidisciplinario (col-span-1 lg:col-span-2) */}
            <div className="bento-card group p-8 flex flex-col justify-between min-h-[320px] lg:col-span-2 reveal-on-scroll reveal-delay-200">
              <div className="bento-card-glow-cyan top-10 right-10 group-hover:scale-125"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-grow">
                {/* Text Content */}
                <div className="space-y-4 lg:col-span-7 z-10">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/30 text-[9px] font-mono tracking-widest text-[#00f0ff] uppercase shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                    3 ESPECIALIDADES
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                      Equipo multidisciplinario
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                      Diseño, contenido y desarrollo trabajando juntos.
                    </p>
                  </div>
                </div>

                {/* High-Impact Visual Graphic Element showing three intersecting disciplines */}
                <div className="lg:col-span-5 relative w-full h-[180px] bg-black/50 rounded-[24px] border border-white/10 overflow-hidden flex items-center justify-center group-hover:border-[#00f0ff]/40 transition-all duration-500 shadow-inner">
                  <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                    
                    {/* Ring Path Overlay */}
                    <div className="absolute w-[110px] h-[110px] rounded-full border border-white/10 animate-spin-3d opacity-30"></div>

                    {/* Circle 1: CM (Cherry) */}
                    <div className="absolute w-[52px] h-[52px] rounded-full bg-[#f60566]/25 border-2 border-[#f60566]/60 flex flex-col items-center justify-center -translate-y-6 transition-all duration-500 group-hover:-translate-y-8 z-10 shadow-[0_0_20px_rgba(246,5,102,0.3)]">
                      <span className="text-[9px] font-extrabold text-white font-mono">CM</span>
                      <span className="text-[6px] text-white/80 font-bold">CONTENIDO</span>
                    </div>

                    {/* Circle 2: Diseñador (White) */}
                    <div className="absolute w-[52px] h-[52px] rounded-full bg-white/10 border-2 border-white/45 flex flex-col items-center justify-center -translate-x-6 translate-y-4 transition-all duration-500 group-hover:-translate-x-8 group-hover:translate-y-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <span className="text-[9px] font-extrabold text-white font-mono">ART</span>
                      <span className="text-[6px] text-white/80 font-bold">DISEÑO</span>
                    </div>

                    {/* Circle 3: Programador (Cyan) */}
                    <div className="absolute w-[52px] h-[52px] rounded-full bg-[#00f0ff]/20 border-2 border-[#00f0ff]/50 flex flex-col items-center justify-center translate-x-6 translate-y-4 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-6 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                      <span className="text-[9px] font-extrabold text-white font-mono">DEV</span>
                      <span className="text-[6px] text-white/80 font-bold">CÓDIGO</span>
                    </div>

                    {/* Connection indicators */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] z-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Portafolio / Proyectos */}
      <section
        id="portafolio"
        className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-white/5 bg-black/35 backdrop-blur-sm overflow-hidden"
      >
        {/* Ambient background light orbs for aesthetic glow depth */}
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-[#f60566]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20 space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f60566]/40 bg-[#f60566]/15 text-[10px] font-mono tracking-[0.25em] text-white font-semibold uppercase animate-pulse shadow-[0_0_15px_rgba(246,5,102,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f60566] inline-block shadow-[0_0_8px_#f60566]"></span>
              Casos de Estudio
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase">
              Ideas convertidas en <span className="text-[#f60566]">experiencias</span>.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl">
              Una selección de proyectos reales, conceptos creativos y exploraciones visuales que redefinen la presencia digital de las marcas.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll reveal-delay-100">
            {['Todos', 'Branding', 'Social Media', 'Web Design', 'Desarrollo Web', 'Contenido Creativo', 'Concept Projects'].map((cat) => (
              <button
                key={cat}
                onClick={() => { playChime('click'); setActiveCategory(cat); }}
                className={`category-filter-btn ${activeCategory === cat ? 'active-category' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout (2-column editorial grid for large screens, 1-column on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects
              .filter(p => activeCategory === 'Todos' || p.category === activeCategory)
              .map((proj, idx) => (
                <div
                  key={proj.title}
                  onClick={() => openJoinModal(`Interés en portafolio: ${proj.title} (${proj.category})`)}
                  className="portfolio-card group flex flex-col justify-between cursor-pointer reveal-on-scroll"
                  style={{ animationDelay: `${0.1 + (idx % 3) * 0.08}s` }}
                >
                  {/* Mockup visual wrapper */}
                  <div className="portfolio-image-wrapper border-b border-white/5">
                    <div className="portfolio-vector-content w-full h-full">
                      {proj.mockup}
                    </div>
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">VER DETALLES</span>
                      <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Description / Content row */}
                  <div className="p-6 space-y-3 relative z-10 bg-black/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-widest text-[#f60566] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f60566]/10 border border-[#f60566]/20">
                        {proj.category}
                      </span>
                      <span className="text-[9px] font-mono text-white/40 tracking-wider">MOCKUP CONCEPT</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* Dynamic Interaction Overlay: Lead Capture Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-[16px] z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-[32px] w-full max-w-md relative border border-[#f60566]/30 shadow-[0_0_50px_rgba(230,31,100,0.25)] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeJoinModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#f60566] hover:border-[#f60566]/40 hover:bg-[#f60566]/10 active:scale-90 transition-all duration-300 z-10"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleModalSubmit} className="flex flex-col gap-5 pt-2">
                {/* Form Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f60566]/15 border border-[#f60566]/40 text-[9px] font-mono tracking-widest text-white font-semibold uppercase animate-pulse shadow-[0_0_15px_rgba(246,5,102,0.25)]">
                    🚀 HACKEA TU OFICINA
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-none uppercase font-outfit">
                    Inicia tu <span className="text-[#f60566]">Proyecto</span>
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed max-w-sm mx-auto font-light">
                    Consigue una propuesta estratégica a la medida y sin costo en menos de 24 horas.
                  </p>
                </div>

                {/* Field: Name */}
                <div className="group flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] text-white/70 tracking-wider font-mono uppercase font-bold group-focus-within:text-[#00f0ff] transition-colors">
                    Tu Nombre o Empresa
                  </label>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-4 z-10 flex items-center justify-center pointer-events-none">
                      <svg className="w-4 h-4 text-[#f60566] group-focus-within:text-[#00f0ff] group-focus-within:scale-110 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#11020a]/80 border border-white/10 group-focus-within:border-[#f60566] focus:border-[#f60566] focus:outline-none focus:ring-1 focus:ring-[#f60566]/30 text-white rounded-2xl text-sm transition-all placeholder:text-white/40"
                      placeholder="Ej. Carlos - Pizzería La Toscana"
                    />
                  </div>
                </div>

                {/* Field: Contact */}
                <div className="group flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] text-white/70 tracking-wider font-mono uppercase font-bold group-focus-within:text-[#00f0ff] transition-colors">
                    WhatsApp o Correo
                  </label>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-4 z-10 flex items-center justify-center pointer-events-none">
                      <svg className="w-4 h-4 text-[#f60566] group-focus-within:text-[#00f0ff] group-focus-within:scale-110 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#11020a]/80 border border-white/10 group-focus-within:border-[#f60566] focus:border-[#f60566] focus:outline-none focus:ring-1 focus:ring-[#f60566]/30 text-white rounded-2xl text-sm transition-all placeholder:text-white/40"
                      placeholder="Ej. hola@empresa.com o +52 ..."
                    />
                  </div>
                </div>

                {/* Field: Sales Hurdle */}
                <div className="group flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] text-white/70 tracking-wider font-mono uppercase font-bold group-focus-within:text-[#00f0ff] transition-colors">
                    ¿Qué te gustaría lograr o vender más?
                  </label>
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-4 z-10 flex items-center justify-center pointer-events-none">
                      <svg className="w-4 h-4 text-[#f60566] group-focus-within:text-[#00f0ff] group-focus-within:scale-110 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={salesHurdle}
                      onChange={(e) => setSalesHurdle(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#11020a]/80 border border-white/10 group-focus-within:border-[#f60566] focus:border-[#f60566] focus:outline-none focus:ring-1 focus:ring-[#f60566]/30 text-white rounded-2xl text-sm transition-all placeholder:text-white/40"
                      placeholder="Ej. Atraer clientes calificados por redes sociales"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-2 group/submit flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-gradient-to-r from-[#f60566] to-[#ff0068] text-white font-bold text-sm tracking-widest uppercase hover:scale-102 active:scale-97 transition-all duration-300 shadow-[0_0_20px_rgba(246,5,102,0.3)] hover:shadow-[0_0_35px_rgba(246,5,102,0.5)] border border-white/10"
                >
                  <span>Enviar Información</span>
                  <svg className="w-4 h-4 text-white group-hover/submit:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="flex flex-col gap-5 items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/10 border-2 border-[#10b981] flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
                  <svg className="w-8 h-8 text-[#10b981]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white neon-glow font-outfit uppercase">
                    ¡Solicitud <span className="text-[#10b981]">Enviada</span>!
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed max-w-xs font-light">
                    Estamos analizando tu presencia digital. Te contactaremos en menos de 24 horas para agendar tu sesión inicial.
                  </p>
                </div>
                <div className="w-6 h-6 border-2 border-[#f60566] border-t-transparent rounded-full animate-spin mt-2"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Toast Notifications */}
      {toastMessage && (
        <div
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 z-50 md:max-w-sm glass-panel border border-[#f60566]/30 shadow-[0_0_25px_rgba(255,46,147,0.25)] rounded-2xl p-4 text-white text-xs sm:text-sm font-semibold tracking-wide text-center md:text-left"
          style={{
            background: 'rgba(28, 5, 15, 0.9)',
            backdropFilter: 'blur(16px)',
            animation: 'float-y 4s infinite alternate ease-in-out'
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
