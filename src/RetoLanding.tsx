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

  const cdDays  = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const cdHours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const cdMins  = Math.floor((timeLeft / 1000 / 60) % 60);
  const cdSecs  = Math.floor((timeLeft / 1000) % 60);
  const pad     = (n: number) => String(n).padStart(2, "0");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;
    setIsSubmitting(true);
    const payload = {
      name: formName,
      email: formEmail,
      phone: `${COUNTRY_DATA[formCountry].code} ${formPhone.trim()}`,
      source: "Reto2026LandingStitch",
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
      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 glass-nav shadow-2xl shadow-black/40">
        <div className="flex justify-center items-center w-full px-6 py-3 max-w-7xl mx-auto">
          <img
            alt="Reto 2k a 20k Logo"
            className="h-14 md:h-16 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
          />
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* ── ATF HERO + FORM — two-column grid ─────────── */}
        <section className="relative px-4 sm:px-6 py-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">

            {/* LEFT: copy + countdown */}
            <div className="flex flex-col gap-5 order-2 lg:order-1">

              {/* PRÓXIMAMENTE tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 w-max">
                <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
                <span className="text-[10px] font-headline font-bold tracking-[0.2em] text-primary-fixed uppercase">
                  PRÓXIMAMENTE
                </span>
              </div>

              {/* H1 — tighter on mobile */}
              <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
                ¿Es posible llevar una cuenta de{" "}
                <span className="text-primary-fixed text-glow">$2,000</span> a{" "}
                <span className="text-primary-fixed text-glow">$20,000 USD</span>{" "}
                operando en vivo?
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl">
                Del <strong className="text-on-surface">20 de abril al 3 de mayo</strong>, operamos una cuenta real,
                en vivo, sin filtros. Regístrate para acceder a la plataforma exclusiva y seguir el Método Ingresarios paso a paso.
              </p>

              {/* Countdown — compact */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/20 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                <p className="relative z-10 font-headline text-[10px] font-semibold tracking-widest text-primary/70 uppercase mb-3">
                  Comenzamos el reto en:
                </p>
                <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
                  {[
                    { val: pad(cdDays),  label: "Días" },
                    { val: pad(cdHours), label: "Horas" },
                    { val: pad(cdMins),  label: "Min" },
                    { val: pad(cdSecs),  label: "Seg" },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-3xl sm:text-4xl font-headline font-bold text-on-surface tabular-nums">
                        {val}
                      </span>
                      <span className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant mt-1">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="relative z-10 mt-3 text-[10px] font-label text-on-surface/50 text-center">
                  20 de Abril • 7:00 PM (Colombia)
                </p>
              </div>
            </div>

            {/* RIGHT: form — appears first on mobile */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="bg-surface-container-high p-6 sm:p-8 rounded-3xl border border-outline-variant/10 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
                <h3 className="font-headline font-bold text-xl sm:text-2xl mb-1 relative z-10">
                  Asegura tu lugar gratis
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 relative z-10">
                  Sé el primero en entrar a la plataforma y seguir el reto en vivo.
                </p>

                <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="juan@email.com"
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1.5 ml-1">
                      WhatsApp
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formCountry}
                        onChange={e => setFormCountry(e.target.value)}
                        className="bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-3 py-3 text-sm text-on-surface transition-all cursor-pointer w-24 shrink-0"
                      >
                        {Object.keys(COUNTRY_DATA).map(c => (
                          <option key={c} value={c} className="bg-surface">
                            {COUNTRY_DATA[c].flag} {COUNTRY_DATA[c].code}
                          </option>
                        ))}
                      </select>
                      <input
                        required
                        type="tel"
                        placeholder="310 000 0000"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        className="flex-1 bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full kinetic-gradient text-on-primary-fixed font-headline font-extrabold py-4 rounded-xl text-base hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Procesando..." : "¡QUIERO SER PARTE DEL RETO!"}
                  </button>
                  <p className="text-[9px] text-center text-on-surface-variant leading-tight">
                    Al unirte, aceptas recibir comunicaciones sobre el reto y nuestra política de tratamiento de datos.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* ── SUMMARY SECTION ────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
                ¿Qué va a pasar en estas fechas?
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Durante 14 días consecutivos, nos conectaremos a las 7:00 PM (Colombia) para operar una cuenta real
                frente a toda nuestra audiencia. No es un curso más; es una demostración de transparencia donde verás:
              </p>

              <div className="space-y-3">
                {[
                  { icon: "monitoring",  color: "text-primary-fixed",  title: "Trading en vivo",         sub: "El crecimiento de una cuenta de $2k a $20k." },
                  { icon: "psychology",  color: "text-secondary-dim",  title: "Psicología y Mentalidad", sub: "Cómo dominar tu termostato financiero." },
                  { icon: "school",      color: "text-tertiary-fixed", title: "Educación Real",          sub: "Detectar estafas, eliminar gastos hormiga y dominar inversiones de alto nivel." },
                ].map(({ icon, color, title, sub }) => (
                  <div key={icon} className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-high transition-all">
                    <span className={`material-symbols-outlined ${color} shrink-0`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {icon}
                    </span>
                    <div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">{title}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border-l-2 border-primary-fixed bg-primary/5 rounded-r-xl">
                <p className="font-body italic text-sm text-on-surface">
                  "Tu acceso te dará entrada a una plataforma interactiva con herramientas y dinámicas exclusivas."
                </p>
              </div>
            </div>

            {/* Repeat form at bottom for those who scroll — lightweight version */}
            <div className="hidden lg:block">
              <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 text-center space-y-3">
                <p className="font-headline font-semibold text-on-surface">¿Ya te registraste?</p>
                <p className="text-sm text-on-surface-variant">Sube hasta arriba para completar tu registro y asegurar tu acceso gratuito.</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="kinetic-gradient text-on-primary-fixed font-headline font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 uppercase"
                >
                  Registrarme ahora
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative glow blobs */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px]" />
        </div>
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="py-12 mt-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              alt="Reto 2k a 20k Logo"
              className="h-10 w-auto opacity-60 grayscale hover:grayscale-0 transition-all"
              src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
            />
            <p className="font-body text-xs text-on-surface-variant">© 2026 Ingresarios - Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <nav className="flex gap-5">
              {["Privacidad", "Términos", "Soporte"].map(l => (
                <a key={l} className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">
                  {l}
                </a>
              ))}
            </nav>
            <p className="text-[9px] text-on-surface-variant max-w-xs text-center md:text-right italic">
              Tus datos están protegidos bajo protocolos de encriptación de grado bancario.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
