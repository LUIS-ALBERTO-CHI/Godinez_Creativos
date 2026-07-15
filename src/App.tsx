import { useState, useEffect } from 'react';
import { Share2, Sparkles, PenTool, Code2, Clapperboard, Target } from 'lucide-react';

// Correo destino de los leads del formulario.
// TODO: confirma/cambia por el correo real del negocio.
const CONTACT_EMAIL = 'godinezcreativoss@gmail.com';

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
  const [imageModal, setImageModal] = useState<{ project: string; images: string[]; index: number } | null>(null);

  useEffect(() => {
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

    return () => sectionObserver.disconnect();
  }, []);

  // Scroll-reveal observer — re-escanea cuando cambia el contenido visible
  // (p. ej. al filtrar el portafolio, que remonta tarjetas nuevas)
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px -5% -5% 0px', threshold: 0.1 }
    );
    document
      .querySelectorAll('.reveal-on-scroll:not(.revealed)')
      .forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [activeCategory]);

  const closeJoinModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setClientName('');
    setContactInfo('');
    setSalesHurdle('');
  };

  // Teclado (Escape/flechas) y bloqueo de scroll cuando hay una capa abierta
  useEffect(() => {
    const anyOpen = isModalOpen || isMobileMenuOpen || imageModal !== null;
    if (!anyOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imageModal) setImageModal(null);
        else if (isModalOpen) closeJoinModal();
        else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        return;
      }
      if (imageModal && imageModal.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setImageModal((m) => (m ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length } : null));
        } else if (e.key === 'ArrowRight') {
          setImageModal((m) => (m ? { ...m, index: (m.index + 1) % m.images.length } : null));
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalOpen, isMobileMenuOpen, imageModal]);

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

  const projects: {
    title: string;
    category: string;
    desc: string;
    preview: string;
    images: string[];
  }[] = [
    {
      title: "MVZ. Joaquín Fernández Vera",
      category: "Branding",
      desc: "Diseño de tarjetas de presentación para clínica veterinaria. Identidad visual oscura con personalidad y estilo.",
      preview: "/mockup-veterinaria.jpeg",
      images: ["/mockup-veterinaria.jpeg", "/mockup-veterinaria-2.jpeg"],
    },
  ];

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !contactInfo) return;

    // Abre el cliente de correo del visitante con el lead prellenado hacia el negocio.
    const subject = `Nuevo proyecto — ${clientName}`;
    const body = [
      `Nombre o empresa: ${clientName}`,
      `Contacto (WhatsApp/correo): ${contactInfo}`,
      `Objetivo: ${salesHurdle || 'No especificado'}`,
      '',
      'Enviado desde godinezcreativos.qzz.io',
    ].join('\n');
    window.location.assign(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setClientName('');
      setContactInfo('');
      setSalesHurdle('');
      triggerToast('¡Listo! Se abrió tu correo con los datos. Envíalo y te respondemos en menos de 24 horas.');
    }, 2500);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const categories = ['Todos', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'Todos' || p.category === activeCategory
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
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
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 text-white/65 hover:text-white"
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            onClick={() => setIsMobileMenuOpen(false)}
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
            <a href={`mailto:${CONTACT_EMAIL}`} className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-[#f60566] hover:border-[#f60566]/40 transition-all active:scale-90" aria-label="Enviar correo">
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
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f60566]/20 group-hover:text-[#f60566] transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </span>
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
                  idx === 0 ? 'text-white/85' : 'text-white/70'
                }`}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA único de la sección */}
          <div className="flex flex-col items-center text-center gap-4 mt-14 md:mt-16">
            <p className="text-sm md:text-base text-white/70 font-light">
              ¿No sabes por dónde empezar? Cuéntanos tu idea y armamos el plan por ti.
            </p>
            <button
              onClick={() => openJoinModal()}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#f60566] text-white font-bold text-sm tracking-wide hover:bg-[#ff0068] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_25px_rgba(246,5,102,0.35)]"
            >
              <span>Hablemos de tu proyecto</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
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

          {/* Diferenciadores — grid de tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {[
              {
                n: '01',
                title: 'Hablas con quien hace el trabajo',
                desc: 'Sin intermediarios, sin cuentas. Te comunicas directamente con el CM, el diseñador o el dev que está trabajando en tu proyecto. Las decisiones llegan rápido y los cambios también.',
              },
              {
                n: '02',
                title: 'Diseño que no se ve a la segunda',
                desc: 'No usamos plantillas de Canva del montón ni estilos que ya viste en tres marcas distintas. Cada pieza que creamos empieza desde cero, pensada específicamente para tu negocio y tu audiencia.',
              },
              {
                n: '03',
                title: 'Tres disciplinas, un solo equipo',
                desc: 'CM, diseñador y desarrollador web trabajando juntos desde el día uno. No contratamos por separado, no coordinamos freelancers. Todo está integrado para que tu marca se vea y funcione de manera consistente.',
              },
              {
                n: '04',
                title: 'Nuevos, sí. Pero bien preparados',
                desc: 'Somos una agencia joven con ganas de demostrar lo que sabemos. Eso significa que traemos energía, atención y dedicación que las agencias grandes ya no dan. Cada cliente importa, porque cada cliente cuenta.',
              },
            ].map((item, idx) => (
              <div
                key={item.n}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8 hover:border-[#f60566]/40 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 reveal-on-scroll"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Número watermark */}
                <span className="pointer-events-none absolute -top-4 -right-2 text-[110px] font-extrabold leading-none text-white/[0.04] group-hover:text-[#f60566]/10 transition-colors duration-500 select-none font-outfit">
                  {item.n}
                </span>

                <div className="relative flex flex-col gap-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#f60566]">{item.n}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#f60566] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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

          {/* Category Filter Tabs — solo se muestran cuando hay variedad real de proyectos */}
          {categories.length > 2 && (
            <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll reveal-delay-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-filter-btn ${activeCategory === cat ? 'active-category' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Portfolio Grid — real project images */}
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#f60566]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">Muy pronto, nuevos proyectos aquí</p>
              <p className="text-sm text-white/60 max-w-sm">
                Estamos preparando trabajos de <span className="text-[#f60566] font-medium">{activeCategory}</span>. Mientras tanto, escríbenos y cuéntanos tu idea.
              </p>
              <button
                onClick={() => openJoinModal()}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#f60566] text-white text-xs font-bold tracking-wide hover:bg-[#ff0068] active:scale-95 transition-all"
              >
                Iniciar mi proyecto
              </button>
            </div>
          ) : (
          <div className={`gap-8 lg:gap-10 ${filteredProjects.length >= 3 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-wrap justify-center'}`}>
            {filteredProjects
              .map((proj, idx) => (
                <div
                  key={proj.title}
                  onClick={() => setImageModal({ project: proj.title, images: proj.images, index: 0 })}
                  className={`portfolio-card group flex flex-col justify-between cursor-pointer reveal-on-scroll ${filteredProjects.length >= 3 ? '' : 'w-full sm:w-[400px]'}`}
                  style={{ animationDelay: `${0.1 + (idx % 3) * 0.08}s` }}
                >
                  {/* Real image preview */}
                  <div className="portfolio-image-wrapper border-b border-white/5 relative overflow-hidden">
                    <img
                      src={proj.preview}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Image count badge */}
                    {proj.images?.length > 1 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span className="text-[9px] font-mono text-white/70">{proj.images.length}</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">VER GALERÍA</span>
                      <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-6 space-y-3 relative z-10 bg-black/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-widest text-[#f60566] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f60566]/10 border border-[#f60566]/20">
                        {proj.category}
                      </span>
                      <span className="text-[9px] font-mono text-[#00f0ff] tracking-wider">PROYECTO REAL</span>
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
          )}

        </div>
      </section>

      {/* Image Lightbox Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-[20px] z-50 flex items-center justify-center"
          onClick={() => setImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería del proyecto ${imageModal.project}`}
        >
          {/* Modal content */}
          <div
            className="relative w-full max-w-4xl mx-4 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="w-full flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f60566] shadow-[0_0_8px_#f60566]"></div>
                <span className="text-sm font-bold text-white">{imageModal.project}</span>
                <span className="text-[9px] font-mono text-white/40">
                  {imageModal.index + 1} / {imageModal.images.length}
                </span>
              </div>
              <button
                onClick={() => setImageModal(null)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 hover:text-[#f60566] hover:border-[#f60566]/40 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(246,5,102,0.12)]">
              <img
                src={imageModal.images[imageModal.index]}
                alt={`${imageModal.project} - imagen ${imageModal.index + 1}`}
                className="w-full h-auto max-h-[75vh] object-contain bg-black"
              />

              {/* Prev arrow */}
              {imageModal.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageModal(m => m ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length } : null)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:bg-[#f60566] hover:border-[#f60566] transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setImageModal(m => m ? { ...m, index: (m.index + 1) % m.images.length } : null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:bg-[#f60566] hover:border-[#f60566] transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {imageModal.images.length > 1 && (
              <div className="flex gap-3">
                {imageModal.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageModal(m => m ? { ...m, index: i } : null)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === imageModal.index
                        ? 'border-[#f60566] shadow-[0_0_12px_rgba(246,5,102,0.4)]'
                        : 'border-white/15 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Interaction Overlay: Lead Capture Modal Form */}
      {isModalOpen && (

        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-[16px] z-50 flex items-center justify-center p-4"
          onClick={closeJoinModal}
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de contacto"
        >
          <div
            className="glass-panel p-6 sm:p-8 rounded-[32px] w-full max-w-md relative border border-[#f60566]/30 shadow-[0_0_50px_rgba(230,31,100,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f60566]/15 border border-[#f60566]/40 text-[9px] font-mono tracking-widest text-white font-semibold uppercase shadow-[0_0_15px_rgba(246,5,102,0.25)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f60566] inline-block shadow-[0_0_8px_#f60566]"></span>
                    Propuesta sin costo
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
                  className="mt-2 group/submit flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-gradient-to-r from-[#f60566] to-[#ff0068] text-white font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(246,5,102,0.3)] hover:shadow-[0_0_35px_rgba(246,5,102,0.5)] border border-white/10"
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
