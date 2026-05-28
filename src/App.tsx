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
  const playChime = (_type: 'success' | 'click' | 'close') => {
    return;
  };

  const openJoinModal = () => {
    // Temporarily disabled modal trigger by user request
    return;
  };

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
    <div className="relative min-h-screen overflow-hidden bg-black select-none">
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
                className="h-7 md:h-9 w-auto object-contain"
              />
            </a>
          </div>

          {/* Menu links on the left side - Desktop Only */}
          <div className="hidden lg:flex items-center gap-6 md:gap-10 text-sm md:text-base font-semibold tracking-wide text-white/90">
            <a href="#" className="hover:text-[#f60566] transition-colors duration-300">Inicio</a>
            <a href="#" onClick={openJoinModal} className="hover:text-[#f60566] transition-colors duration-300">Sobre nosotros</a>
            <a href="#" onClick={openJoinModal} className="hover:text-[#f60566] transition-colors duration-300">Servicios</a>
            <a href="#" onClick={openJoinModal} className="hover:text-[#f60566] transition-colors duration-300">Clientes</a>
          </div>

          {/* Dynamic Capsule Menu on the right side - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openJoinModal}
              className="glass-panel glass-panel-hover flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide text-white border border-white/15"
            >
              Menu
            </button>
            <button
              onClick={() => { playChime('click'); triggerToast('🚀 Conectando interfaz central...'); }}
              className="glass-panel glass-panel-hover flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white font-bold"
            >
              ••
            </button>
          </div>

          {/* Mobile Hamburger Trigger Button (Visible on screens < 1024px) */}
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
              className="h-8 w-auto object-contain"
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
            { name: 'Sobre nosotros', desc: 'Quiénes somos y qué hacemos', href: '#', action: openJoinModal },
            { name: 'Servicios', desc: 'Estrategia, diseño y desarrollo', href: '#', action: openJoinModal },
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
              {/* Massive branding text with futuristic typography */}
              <img
                src="/titulo.png"
                alt="Godínez Creativos"
                className="w-full max-w-[290px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[480px] xl:max-w-[580px] h-auto object-contain mx-auto lg:mx-0 drop-shadow-[0_0_25px_rgba(255,0,104,0.35)]"
              />
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
          <div className="w-full lg:w-[55vw] flex items-end justify-center relative min-h-[300px] sm:min-h-[400px] md:min-h-[550px] lg:absolute lg:right-0 lg:bottom-[92px] lg:top-0 lg:z-0 lg:pointer-events-none">

            {/* Glowing Backdrop Circle behind mascot */}
            <div className="absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-t from-[#f60566]/12 via-[#f60566]/4 to-transparent blur-3xl pointer-events-none"></div>

            {/* Mascot Image Container with Cybernetic Visor - Giant & Borderless */}
            <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[85vh] max-h-[850px] flex items-end justify-center lg:justify-end transition-all duration-500 floating-subtle">
              <img
                src="mascota.png"
                alt="Cyber Godínez Mascot"
                className="h-full w-auto object-contain object-bottom grayscale-[5%] brightness-[92%] hover:scale-[1.03] transition-transform duration-700 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Logo Ribbon (Infinite scrolling marquee for premium mobile/desktop experience) */}
        <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md relative z-25 mt-8 py-6 px-0 overflow-hidden">
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
                <div key={`${logo.name}-1-${idx}`} className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 md:h-8 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="text-sm font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">{logo.name}</span>
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
                <div key={`${logo.name}-2-${idx}`} className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-7 md:h-8 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="text-sm font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Dynamic Interaction Overlay: Lead Capture Modal Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-panel p-8 rounded-[32px] w-full max-w-md relative animate-[float-y_6s_infinite_alternate_ease-in-out] border border-[#f60566]/30 shadow-[0_0_50px_rgba(230,31,100,0.25)]">
            <button
              onClick={closeJoinModal}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 46, 147, 0.2)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
              className="hover:border-[#f60566] hover:text-[#f60566] transition-colors"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <h3 className="text-2xl font-bold text-white text-center tracking-tight neon-glow">Inicia tu Proyecto 🚀</h3>
                <p className="text-white/60 text-xs text-center leading-relaxed">
                  Consigue una cotización a la medida y una propuesta estratégica personalizada en menos de 24 horas.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label className="text-[10px] text-white/50 tracking-wider font-mono uppercase font-bold">Tu Nombre o Empresa</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{
                      background: 'rgba(20, 5, 12, 0.9)',
                      border: '1px solid rgba(255, 46, 147, 0.25)',
                      color: '#ffffff',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '16px'
                    }}
                    className="focus:border-[#f60566] focus:outline-none transition-colors text-sm"
                    placeholder="Ej. Carlos - Pizzería La Toscana"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label className="text-[10px] text-white/50 tracking-wider font-mono uppercase font-bold">WhatsApp o Correo</label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    style={{
                      background: 'rgba(20, 5, 12, 0.9)',
                      border: '1px solid rgba(255, 46, 147, 0.25)',
                      color: '#ffffff',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '16px'
                    }}
                    className="focus:border-[#f60566] focus:outline-none transition-colors text-sm"
                    placeholder="Ej. +52 55 1234 5678"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label className="text-[10px] text-white/50 tracking-wider font-mono uppercase font-bold">¿Qué te gustaría vender más?</label>
                  <input
                    type="text"
                    value={salesHurdle}
                    onChange={(e) => setSalesHurdle(e.target.value)}
                    style={{
                      background: 'rgba(20, 5, 12, 0.9)',
                      border: '1px solid rgba(255, 46, 147, 0.25)',
                      color: '#ffffff',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '16px'
                    }}
                    className="focus:border-[#f60566] focus:outline-none transition-colors text-sm"
                    placeholder="Ej. Agendar citas de consultoría"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#e61f64] hover:bg-[#f60566] text-white font-bold py-3 rounded-full hover:scale-102 active:scale-98 transition-all shadow-[0_0_20px_rgba(230,31,100,0.3)] text-sm"
                >
                  Enviar Información 🚀
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                  fontSize: '2rem'
                }}>
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white neon-glow">¡Solicitud Enviada!</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Estamos analizando tu presencia digital. Te contactaremos en menos de 24 horas para tu llamada estratégica inicial.
                </p>
                <div className="w-6 h-6 border-2 border-[#f60566] border-t-transparent rounded-full animate-spin"></div>
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
