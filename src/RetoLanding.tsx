import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── LÓGICA CORE ───────────────────────────────────────
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/jTugwykceKyJlATOSvkb/webhook-trigger/233a5165-6ebf-4cb3-8656-de35a4e7d813";
const TARGET_DATE = new Date("2026-04-20T19:00:00-05:00").getTime();

const COUNTRY_DATA: Record<string, { flag: string; code: string; name: string }> = {
  MX: { flag: "🇲🇽", code: "+52", name: "México" },
  CO: { flag: "🇨🇴", code: "+57", name: "Colombia" },
  AR: { flag: "🇦🇷", code: "+54", name: "Argentina" },
  CL: { flag: "🇨🇱", code: "+56", name: "Chile" },
  PE: { flag: "🇵🇪", code: "+51", name: "Perú" },
  ES: { flag: "🇪🇸", code: "+34", name: "España" },
  US: { flag: "🇺🇸", code: "+1", name: "Estados Unidos" },
  EC: { flag: "🇪🇨", code: "+593", name: "Ecuador" },
  VE: { flag: "🇻🇪", code: "+58", name: "Venezuela" },
  UY: { flag: "🇺🇾", code: "+598", name: "Uruguay" },
  PA: { flag: "🇵🇦", code: "+507", name: "Panamá" },
  CR: { flag: "🇨🇷", code: "+506", name: "Costa Rica" },
  DO: { flag: "🇩🇴", code: "+1", name: "República Dominicana" },
  GT: { flag: "🇬🇹", code: "+502", name: "Guatemala" },
  HN: { flag: "🇭🇳", code: "+504", name: "Honduras" },
  SV: { flag: "🇸🇻", code: "+503", name: "El Salvador" },
  NI: { flag: "🇳🇮", code: "+505", name: "Nicaragua" },
  BO: { flag: "🇧🇴", code: "+591", name: "Bolivia" },
  PY: { flag: "🇵🇾", code: "+595", name: "Paraguay" },
};

export default function RetoLanding() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.max(0, TARGET_DATE - Date.now()));

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCountry, setFormCountry] = useState("CO");
  const [formPhone, setFormPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.className = "bg-surface text-on-surface font-body selection:bg-primary/30";

    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, TARGET_DATE - Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cdDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const cdHours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const cdMins = Math.floor((timeLeft / 1000 / 60) % 60);
  const cdSecs = Math.floor((timeLeft / 1000) % 60);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;

    setIsSubmitting(true);
    const fullPhone = `${COUNTRY_DATA[formCountry].code} ${formPhone.trim()}`;
    const payload = {
      name: formName,
      email: formEmail,
      phone: fullPhone,
      source: "Reto2026LandingStitch"
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      navigate("/preview");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Ocurrió un error al enviar el registro. Intenta otra vez.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="docked full-width top-0 sticky z-50 glass-nav shadow-2xl shadow-black/40">
        <div className="flex justify-center items-center w-full px-8 py-6 max-w-7xl mx-auto">
          <img alt="Reto 2k a 20k Logo" className="h-20 md:h-28 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"/>
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* PRÓXIMAMENTE Tag */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse mr-2"></span>
            <span className="text-xs font-headline font-bold tracking-[0.2em] text-primary-fixed uppercase">PRÓXIMAMENTE</span>
          </div>

          <h1 className="font-headline font-bold text-4xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] max-w-5xl mb-8">
            ¿Es posible llevar una cuenta de <span className="text-primary-fixed text-glow">$2,000</span> a <span className="text-primary-fixed text-glow">$20,000 USD</span> operando en vivo?
          </h1>

          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-12">
            Estamos preparando una experiencia de trading real, sin filtros y en tiempo real. Del 20 de abril al 3 de mayo, abriremos las puertas de nuestra plataforma exclusiva para mostrarte el paso a paso del Método Ingresarios.
          </p>

          {/* Countdown Timer */}
          <div className="w-full max-w-4xl p-8 rounded-2xl bg-surface-container border border-outline-variant/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <h3 className="relative z-10 font-headline text-sm font-semibold tracking-widest text-primary/80 uppercase mb-8">Comenzamos el reto en:</h3>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-headline font-bold text-on-surface">{cdDays < 10 ? `0${cdDays}` : cdDays}</span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-2">Días</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-headline font-bold text-on-surface">{cdHours < 10 ? `0${cdHours}` : cdHours}</span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-2">Horas</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-headline font-bold text-on-surface">{cdMins < 10 ? `0${cdMins}` : cdMins}</span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-2">Minutos</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-headline font-bold text-on-surface beat-animation">{cdSecs < 10 ? `0${cdSecs}` : cdSecs}</span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant mt-2">Segundos</span>
              </div>
            </div>
            
            <p className="relative z-10 mt-8 text-sm font-label text-on-surface/60">20 de Abril • 7:00 PM (Colombia)</p>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="font-headline font-bold text-3xl md:text-5xl leading-tight">
                ¿Qué va a pasar en estas fechas?
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Durante 14 días consecutivos, nos conectaremos a las 7:00 PM (Colombia) para operar una cuenta real frente a toda nuestra audiencia. No es un curso más; es una demostración de transparencia donde verás:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-primary-fixed shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">Trading en vivo</h4>
                    <p className="text-on-surface-variant">El crecimiento de una cuenta de $2k a $20k.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-secondary-dim shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">Psicología y Mentalidad</h4>
                    <p className="text-on-surface-variant">Cómo dominar tu termostato financiero.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-tertiary-fixed shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">Educación Real</h4>
                    <p className="text-on-surface-variant">Detectar estafas, eliminar gastos hormiga y dominar inversiones de alto nivel.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-l-2 border-primary-fixed bg-primary/5 rounded-r-xl">
                <p className="font-body italic text-on-surface">
                  "Tu acceso te dará entrada a una plataforma interactiva con herramientas y dinámicas exclusivas."
                </p>
              </div>
            </div>

            {/* Registration Form Container */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-surface-container-high p-8 md:p-10 rounded-3xl border border-outline-variant/10 shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-3xl rounded-full"></div>
                <h3 className="font-headline font-bold text-2xl md:text-3xl mb-4">Asegura tu lugar en la lista de espera</h3>
                <p className="text-on-surface-variant mb-8">Sé el primero en entrar a la plataforma y recibir las actualizaciones.</p>
                
                <form onSubmit={handleRegister} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Nombre Completo</label>
                    <input required className="w-full bg-surface-container-highest border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-4 transition-all text-on-surface" placeholder="Ej. Juan Pérez" type="text" value={formName} onChange={e => setFormName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email</label>
                    <input required className="w-full bg-surface-container-highest border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-4 transition-all text-on-surface" placeholder="juan@email.com" type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">WhatsApp</label>
                    <div className="flex gap-2">
                       <select
                          value={formCountry}
                          onChange={e => setFormCountry(e.target.value)}
                          className="bg-surface-container-highest border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-3 py-4 transition-all text-on-surface cursor-pointer w-24"
                        >
                          {Object.keys(COUNTRY_DATA).map(c => (
                            <option key={c} value={c} className="bg-surface">
                              {COUNTRY_DATA[c].flag} {COUNTRY_DATA[c].code}
                            </option>
                          ))}
                        </select>
                       <input required className="w-full bg-surface-container-highest border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-4 transition-all text-on-surface flex-1" placeholder="310 000 0000" type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)} />
                    </div>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full kinetic-gradient text-on-primary-fixed font-headline font-extrabold py-5 rounded-xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 mt-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Procesando..." : "¡QUIERO SER PARTE DEL RETO!"}
                  </button>
                  <p className="text-[10px] text-center text-on-surface-variant mt-4 leading-tight">
                    Al unirte, aceptas recibir comunicaciones sobre el reto y nuestra política de tratamiento de datos.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px]"></div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="full-width py-16 mt-12 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img alt="Reto 2k a 20k Logo" className="h-12 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"/>
            <p className="font-body text-sm text-on-surface-variant">© 2026 Ingresarios - Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <nav className="flex gap-6 mb-2">
              <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Privacidad</a>
              <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Términos</a>
              <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Soporte</a>
            </nav>
            <p className="text-[10px] text-on-surface-variant max-w-xs text-center md:text-right italic">
              Nota de privacidad: Tus datos están protegidos bajo protocolos de encriptación de grado bancario. No compartimos tu información con terceros.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
