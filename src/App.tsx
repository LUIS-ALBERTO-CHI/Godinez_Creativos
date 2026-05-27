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
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-white/15 text-white active:scale-95 transition-all duration-300 z-50 relative"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
        {/* Cherry ambient glow inside mobile drawer */}
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#f60566]/10 blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col items-center gap-8 text-xl md:text-2xl font-bold tracking-widest text-white/95">
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-item hover:text-[#f60566] transition-colors duration-300"
            style={{ animationDelay: '0.15s' }}
          >
            INICIO
          </a>
          <a
            href="#"
            onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }}
            className="mobile-menu-item hover:text-[#f60566] transition-colors duration-300"
            style={{ animationDelay: '0.28s' }}
          >
            SOBRE NOSOTROS
          </a>
          <a
            href="#"
            onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }}
            className="mobile-menu-item hover:text-[#f60566] transition-colors duration-300"
            style={{ animationDelay: '0.41s' }}
          >
            SERVICIOS
          </a>
          <a
            href="#"
            onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }}
            className="mobile-menu-item hover:text-[#f60566] transition-colors duration-300"
            style={{ animationDelay: '0.54s' }}
          >
            CLIENTES
          </a>

          {/* Staggered CTA within mobile drawer */}
          <button
            onClick={() => { setIsMobileMenuOpen(false); openJoinModal(); }}
            className="mobile-menu-item mt-6 px-8 py-3.5 rounded-full bg-[#f60566] hover:bg-[#ff0068] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(246,5,102,0.3)] active:scale-95"
            style={{ animationDelay: '0.67s' }}
          >
            Comenzar Proyecto 🚀
          </button>
        </div>
      </div>

      {/* Main Core Hero Content */}
      <main className="relative z-10 flex flex-col justify-between min-h-screen pt-28 pb-6 md:pt-36">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 max-w-7xl w-full mx-auto gap-12 lg:gap-6 flex-grow">

          {/* LEFT COLUMN: Texts & CTAs */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left z-10 relative">
            <div className="space-y-4">
              {/* Massive branding text with futuristic typography */}
              <img
                src="/titulo.png"
                alt="Godínez Creativos"
                className="w-full max-w-[350px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[480px] xl:max-w-[580px] h-auto object-contain mx-auto lg:mx-0 drop-shadow-[0_0_25px_rgba(255,0,104,0.35)]"
              />
              <p className="text-sm md:text-base font-medium text-[#f60566] tracking-[0.25em] uppercase letter-spacing-wide">
                MARCAS QUE SE VEN DIFERENTES
                VENDEN DIFERENTE.
              </p>
            </div>

            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
              Impulsamos marcas con creatividad, estrategia y tecnología. Convertimos ideas en experiencias digitales que conectan, atraen y generan resultados reales.            </p>

            {/* Futuristic pill buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Pill Button 1 */}
              <button
                onClick={openJoinModal}
                className="group relative flex items-center justify-between w-52 px-6 py-3.5 rounded-full glass-panel hover:border-[#f60566]/50 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Descubrir</span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:bg-[#f60566]/20 group-hover:text-[#f60566] transition-colors">••</span>
              </button>

              {/* Pill Button 2 */}
              <a
                href="https://www.facebook.com/share/18omatXk9k/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1b0511]/85 border border-[#f60566]/35 hover:border-[#f60566] text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(230,31,100,0.15)] hover:shadow-[0_0_30px_rgba(230,31,100,0.3)]"
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
          <div className="w-full lg:w-[55vw] flex items-end justify-center relative min-h-[400px] md:min-h-[550px] lg:absolute lg:right-0 lg:bottom-[92px] lg:top-0 lg:z-0 lg:pointer-events-none">

            {/* Concentric 3D Spinning Orbits */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="orbit-ring-3d ring-outer" style={{ width: '750px', height: '750px' }}></div>
              <div className="orbit-ring-3d ring-middle" style={{ width: '600px', height: '600px' }}></div>
              <div className="orbit-ring-3d ring-inner" style={{ width: '450px', height: '450px' }}></div>
            </div>

            {/* Glowing Backdrop Circle behind mascot */}
            <div className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-t from-[#f60566]/12 via-[#f60566]/4 to-transparent blur-3xl pointer-events-none"></div>

            {/* Mascot Image Container with Cybernetic Visor - Giant & Borderless */}
            <div className="relative w-full h-[65vh] md:h-[75vh] lg:h-[85vh] max-h-[850px] flex items-end justify-center lg:justify-end transition-all duration-500 floating-subtle">
              <img
                src="mascota.png"
                alt="Cyber Godínez Mascot"
                className="h-full w-auto object-contain object-bottom grayscale-[5%] brightness-[92%] hover:scale-[1.03] transition-transform duration-700 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Logo Ribbon (Clean large logos, borderless, matching example) */}
        <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md relative z-25 mt-8 py-8 px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-8 md:gap-12">

            {/* Illustrator Logo */}
            <div className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300">
              <img
                src="/adobe-illustrator-seeklogo.svg"
                alt="Adobe Illustrator"
                className="h-8 md:h-9 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">Illustrator</span>
            </div>

            {/* After Effects Logo */}
            <div className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300">
              <img
                src="/adobe-after-effects-seeklogo.png"
                alt="Adobe After Effects"
                className="h-8 md:h-9 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">After Effects</span>
            </div>

            {/* Canva Logo */}
            <div className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300">
              <img
                src="/canva-seeklogo.svg"
                alt="Canva"
                className="h-8 md:h-9 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">Canva</span>
            </div>

            {/* Meta Ads Logo */}
            <div className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300">
              <img
                src="/meta-icon-new-facebook-2021-seeklogo.svg"
                alt="Meta Ads"
                className="h-8 md:h-9 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">Meta Ads</span>
            </div>

            {/* CapCut Logo */}
            <div className="group flex items-center gap-2.5 select-none cursor-default hover:scale-[1.03] transition-transform duration-300">
              <img
                src="/capcut-seeklogo-2.svg"
                alt="CapCut"
                className="h-8 md:h-9 w-auto grayscale brightness-[2.5] opacity-40 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-medium tracking-wide text-white/40 group-hover:text-white transition-colors duration-300">CapCut</span>
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
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 150,
          background: 'rgba(28, 5, 15, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 46, 147, 0.3)',
          boxShadow: '0 0 25px rgba(255, 46, 147, 0.25)',
          borderRadius: '20px',
          padding: '1rem 1.5rem',
          maxWidth: '380px',
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 500,
          animation: 'float-y 4s infinite alternate ease-in-out'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
