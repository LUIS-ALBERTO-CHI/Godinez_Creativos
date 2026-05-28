import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [salesHurdle, setSalesHurdle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sound chime synthesizer for micro-interactions (disabled)
  const playChime = (type: 'success' | 'click' | 'close') => {
    void type;
  };

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
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      badge: "MÁS SEGUIDORES Y CLIENTES"
    },
    {
      title: "Branding",
      desc: "Le damos una cara bonita y una personalidad única a tu negocio. Logotipos, colores y diseños memorables para que no te parezcas a nadie más.",
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      badge: "DISEÑO DE MARCA ÚNICA"
    },
    {
      title: "Diseño Gráfico",
      desc: "Creamos imágenes y publicaciones tan llamativas que tus clientes no podrán evitar detenerse a verlas mientras deslizan su pantalla.",
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l5.096-.813a2 2 0 001.414-.586l6.096-6.096a2 2 0 00-.707-3.414l-5.096-.813a2 2 0 00-1.414.586L9.227 15.904a2 2 0 00-.586 1.414z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 7.5l3 3M3 13.5h7.5M3 16.5h4.5M3 10.5h10.5" />
        </svg>
      ),
      badge: "IMÁGENES QUE ATRAEN"
    },
    {
      title: "Desarrollo Web",
      desc: "Creamos páginas web rápidas, sencillas de usar y muy atractivas que funcionan perfecto en celulares y están listas para vender tus servicios.",
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      badge: "TU SITIO WEB PERFECTO"
    },
    {
      title: "Contenido Creativo",
      desc: "Hacemos videos entretenidos en TikTok y Reels que se vuelven populares y textos ingeniosos que convencen a cualquiera de comprarte.",
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      badge: "VIDEOS Y TEXTOS DIVERTIDOS"
    },
    {
      title: "Estrategia Digital",
      desc: "Ponemos tus anuncios frente a las personas indicadas para que cada centavo que inviertas se traduzca en nuevas llamadas, mensajes y ventas.",
      icon: (
        <svg className="w-8 h-8 text-[#f60566] group-hover:text-[#00f0ff] transition-all duration-500 ease-out" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.875v-5.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      badge: "ANUNCIOS EFECTIVOS"
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

      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 w-full z-45 px-6 md:px-16 py-6 md:py-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo brand anchor (always visible) */}
          <div className="flex items-center text-sm md:text-base font-semibold tracking-wide text-white/90">
            <a href="#" className="flex items-center transition-transform hover:scale-105 active:scale-95 pr-2">
              <img
                src="/icon.jpeg"
                alt="Godínez Creativos"
                className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover border border-white/10"
              />
            </a>
          </div>

          {/* Menu links on the left side - Desktop Only */}
          <div className="hidden lg:flex items-center gap-6 md:gap-10 text-sm md:text-base font-semibold tracking-wide text-white/90">
            <a href="#" className="hover:text-[#f60566] transition-colors duration-300">Inicio</a>
            <a href="#servicios" className="hover:text-[#f60566] transition-colors duration-300">Servicios</a>
            <a href="#" onClick={openJoinModal} className="hover:text-[#f60566] transition-colors duration-300">Clientes</a>
          </div>

          {/* Mobile hamburger menu toggle (Visible on screens < 1024px) */}
          <button
            onClick={() => { playChime('click'); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-white/15 text-white active:scale-95 transition-all duration-300 z-50 relative animate-pulse"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 text-white animate-[spin_0.3s_ease-out]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
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
            { name: 'Servicios', desc: 'Estrategia, diseño y desarrollo', href: '#servicios' },
            { name: 'Clientes', desc: 'Empresas que confían en nosotros', href: '#', action: openJoinModal }
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
      <main className="relative z-10 flex flex-col justify-between min-h-screen pt-28 pb-6 md:pt-36">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f60566]/20 bg-[#f60566]/5 text-[10px] font-mono tracking-[0.25em] text-[#f60566] uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f60566] inline-block"></span>
              Nuestros Superpoderes
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase">
              ¿Qué <span className="text-[#f60566]">hacemos</span>?
            </h2>
            
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl">
              Fórmula única: unimos la chispa y dinamismo del <strong className="text-[#f60566] font-semibold">Community Manager</strong>, la disrupción estética del <strong className="text-white font-semibold">Diseñador</strong> y la agilidad de vanguardia del <strong className="text-[#00f0ff] font-semibold">Programador Web</strong> para hackear las ventas de tu marca.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((svc, idx) => (
              <div 
                key={idx}
                onClick={() => openJoinModal(svc.title)}
                className="glass-panel group flex flex-col justify-between p-8 rounded-[32px] border border-white/5 hover:border-[#f60566]/35 hover:bg-[#f60566]/5 active:scale-[0.99] transition-all duration-500 relative overflow-hidden min-h-[320px] h-auto cursor-pointer"
              >
                {/* Radial gradient glow in background revealed on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#f60566]/2 to-[#00f0ff]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="space-y-5 relative z-10">
                  {/* Icon & Badge row */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#f60566]/10 border border-[#f60566]/20 flex items-center justify-center group-hover:bg-[#f60566] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(246,5,102,0.1)] group-hover:shadow-[0_0_35px_rgba(246,5,102,0.4)]">
                      {svc.icon}
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase group-hover:text-[#00f0ff] transition-colors duration-300 bg-white/5 group-hover:bg-[#00f0ff]/10 px-2.5 py-1 rounded-full border border-white/5 group-hover:border-[#00f0ff]/20">
                      {svc.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-[#f60566] transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                {/* Cybernetic Arrow Button Link */}
                <div className="flex items-center justify-end relative z-10 pt-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-white/30 group-hover:text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 pr-2">
                    EXPLORAR
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#00f0ff]/20 flex items-center justify-center border border-white/5 group-hover:border-[#00f0ff]/40 text-white/70 group-hover:text-[#00f0ff] transition-all duration-500 group-hover:rotate-45">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Subtle corner tech border lines */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#f60566]/20 group-hover:border-[#f60566]/80 transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#f60566]/20 group-hover:border-[#f60566]/80 transition-colors"></div>
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f60566]/10 border border-[#f60566]/20 text-[9px] font-mono tracking-widest text-[#f60566] uppercase animate-pulse">
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
