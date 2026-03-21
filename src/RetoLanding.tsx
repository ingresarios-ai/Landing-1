import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/jTugwykceKyJlATOSvkb/webhook-trigger/233a5165-6ebf-4cb3-8656-de35a4e7d813";
const TARGET_DATE = new Date("2026-04-20T19:00:00-05:00").getTime();

const COUNTRY_DATA: Record<string, { flag: string; code: string }> = {
  CO: { flag: "🇨🇴", code: "+57" },
  MX: { flag: "🇲🇽", code: "+52" },
  AR: { flag: "🇦🇷", code: "+54" },
  CL: { flag: "🇨🇱", code: "+56" },
  PE: { flag: "🇵🇪", code: "+51" },
  ES: { flag: "🇪🇸", code: "+34" },
  US: { flag: "🇺🇸", code: "+1" },
  EC: { flag: "🇪🇨", code: "+593" },
  VE: { flag: "🇻🇪", code: "+58" },
  UY: { flag: "🇺🇾", code: "+598" },
  PA: { flag: "🇵🇦", code: "+507" },
  CR: { flag: "🇨🇷", code: "+506" },
  GT: { flag: "🇬🇹", code: "+502" },
  BO: { flag: "🇧🇴", code: "+591" },
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
    const timer = setInterval(() => setTimeLeft(Math.max(0, TARGET_DATE - Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cdDays  = Math.floor(timeLeft / 86400000);
  const cdHours = Math.floor((timeLeft / 3600000) % 24);
  const cdMins  = Math.floor((timeLeft / 60000) % 60);
  const cdSecs  = Math.floor((timeLeft / 1000) % 60);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;
    setIsSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: `${COUNTRY_DATA[formCountry].code} ${formPhone.trim()}`,
          source: "Reto2026Landing",
        }),
      });
      navigate("/preview");
    } catch {
      setIsSubmitting(false);
      alert("Error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <>
      {/* Ambient glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[900px] h-[500px] bg-primary/6 rounded-full blur-[160px] opacity-50" />
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[500px] bg-tertiary/6 rounded-full blur-[180px] opacity-30" />
      </div>

      {/* ── HEADER ─────────────────────────────── */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="flex justify-center px-6 py-3 max-w-5xl mx-auto">
          <img
            alt="Reto 2k a 20k"
            className="h-24 md:h-28 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
          />
        </div>
      </header>

      <main>
        {/* ── ATF HERO ───────────────────────────── */}
        <section className="px-4 sm:px-6 pt-10 pb-8 max-w-3xl mx-auto flex flex-col items-center text-center gap-5">

          {/* Eyebrow label */}
          <p className="text-xs font-headline font-bold tracking-[0.25em] text-on-surface-variant uppercase">
            Del 20 de abril al 3 de mayo
          </p>

          {/* Countdown — right below eyebrow */}
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-[10px] font-headline font-semibold tracking-widest text-primary/70 uppercase">
              Comenzamos en:
            </p>
            <div className="grid grid-cols-4 gap-2 w-full max-w-xs text-center">
              {[
                { val: pad(cdDays),  label: "Días" },
                { val: pad(cdHours), label: "Horas" },
                { val: pad(cdMins),  label: "Min" },
                { val: pad(cdSecs),  label: "Seg" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center gap-0.5 bg-surface-container rounded-xl py-2.5 border border-outline-variant/15">
                  <span className="text-xl font-headline font-bold text-on-surface tabular-nums leading-none">{val}</span>
                  <span className="text-[8px] font-label uppercase tracking-widest text-on-surface-variant">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] tracking-tight leading-[1.08]">
            ¿Es posible llevar una cuenta de{" "}
            <span className="text-primary-fixed text-glow">$2,000</span> a{" "}
            <span className="text-primary-fixed text-glow">$20,000 USD</span>{" "}
            operando en vivo?
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Del <strong className="text-on-surface font-semibold">20 de abril al 3 de mayo</strong>, operamos una cuenta real frente a toda nuestra audiencia, sin filtros y en tiempo real. Regístrate gratis y accede a la plataforma exclusiva para seguir el Método Ingresarios paso a paso.
          </p>

          {/* ── FORM ─────────────── */}
          <form onSubmit={handleRegister} className="w-full max-w-xl flex flex-col gap-3 mt-1">
            {/* Row 1: name */}
            <input
              required type="text" placeholder="Tu nombre"
              value={formName} onChange={e => setFormName(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary-fixed focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all"
            />
            {/* Row 2: email */}
            <input
              required type="email" placeholder="Tu email"
              value={formEmail} onChange={e => setFormEmail(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary-fixed focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all"
            />

            {/* Row 3: whatsapp */}
            <div className="flex gap-3">
              <select
                value={formCountry} onChange={e => setFormCountry(e.target.value)}
                className="bg-surface-container-highest border border-outline-variant/30 focus:border-primary-fixed focus:ring-0 rounded-xl px-3 py-3 text-sm text-on-surface transition-all cursor-pointer shrink-0 w-[90px]"
              >
                {Object.keys(COUNTRY_DATA).map(c => (
                  <option key={c} value={c} className="bg-surface">
                    {COUNTRY_DATA[c].flag} {COUNTRY_DATA[c].code}
                  </option>
                ))}
              </select>
              <input
                required type="tel" placeholder="Tu WhatsApp"
                value={formPhone} onChange={e => setFormPhone(e.target.value)}
                className="flex-1 bg-surface-container-highest border border-outline-variant/30 focus:border-primary-fixed focus:ring-0 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all"
              />
            </div>

            {/* Row 4: CTA full width */}
            <button
              type="submit" disabled={isSubmitting}
              className="w-full kinetic-gradient text-on-primary-fixed font-headline font-extrabold py-4 rounded-xl text-base hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {isSubmitting ? "Procesando..." : "¡QUIERO ENTRAR AL RETO!"}
            </button>
          </form>

          {/* Social proof line */}
          <p className="text-xs text-on-surface-variant">
            Acceso completamente gratuito
          </p>

          {/* Date badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shrink-0" />
            <span className="font-headline text-xs font-bold text-on-surface tracking-wide">
              Comienza el{" "}
              <span className="text-primary-fixed">20 de Abril</span>
              {" "}· 7:00 PM Colombia
            </span>
          </div>
        </section>

        {/* ── WHAT HAPPENS SECTION ────────────────── */}
        <section className="px-4 sm:px-6 py-12 pb-16 max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-center mb-3">
            ¿Qué va a pasar en el Reto de 2k a 20k?
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed text-center mb-10">
            Durante 14 días consecutivos, nos conectaremos a las 7:00 PM (Colombia) para operar una cuenta real frente a toda nuestra audiencia. No es un curso más; es una demostración de transparencia donde verás:
          </p>

          <div className="flex flex-col gap-4">
            {[
              { icon: "monitoring",  color: "text-primary-fixed",  bg: "bg-primary/8",   title: "Trading en vivo",         sub: "El crecimiento de una cuenta de $2k a $20k." },
              { icon: "psychology",  color: "text-secondary-dim",  bg: "bg-secondary/8", title: "Psicología y Mentalidad",  sub: "Cómo dominar tu termostato financiero." },
              { icon: "school",      color: "text-tertiary-fixed", bg: "bg-tertiary/8",  title: "Educación Real",           sub: "Detectar estafas, eliminar gastos hormiga y dominar inversiones de alto nivel." },
            ].map(({ icon, color, bg, title, sub }) => (
              <div key={icon} className={`flex items-start gap-4 p-5 rounded-2xl ${bg} border border-outline-variant/10 hover:border-outline-variant/30 transition-all`}>
                <span className={`material-symbols-outlined ${color} text-2xl shrink-0 mt-0.5`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <div>
                  <h4 className="font-headline font-bold text-sm text-on-surface">{title}:</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 border-l-2 border-primary-fixed bg-primary/5 rounded-r-2xl">
            <p className="font-body italic text-sm text-on-surface">
              Tu acceso te dará entrada a una plataforma interactiva con herramientas y dinámicas exclusivas.
            </p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="py-10 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              alt="Reto 2k a 20k"
              className="h-9 w-auto opacity-60 grayscale hover:grayscale-0 transition-all"
              src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
            />
            <p className="font-body text-xs text-on-surface-variant">© 2026 Ingresarios · Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <nav className="flex gap-5">
              {["Privacidad", "Términos", "Soporte"].map(l => (
                <a key={l} href="#" className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary-fixed transition-colors">{l}</a>
              ))}
            </nav>
            <p className="text-[9px] text-on-surface-variant max-w-xs text-center md:text-right italic">
              Tus datos están protegidos con encriptación de grado bancario.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
