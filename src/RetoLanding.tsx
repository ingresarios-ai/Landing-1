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
  DO: { flag: "🇩🇴", code: "+1" },
  GT: { flag: "🇬🇹", code: "+502" },
  HN: { flag: "🇭🇳", code: "+504" },
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
      {/* ── HEADER ─────────────────── */}
      <header className="sticky top-0 z-50 glass-nav shadow-xl shadow-black/40">
        <div className="flex justify-center items-center px-6 py-3 max-w-5xl mx-auto">
          <img
            alt="Reto 2k a 20k"
            className="h-12 md:h-14 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
          />
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-tertiary/8 rounded-full blur-[150px] opacity-30" />
        </div>

        {/* ── ATF: single column hero + form ─── */}
        <section className="px-4 sm:px-6 pt-8 pb-6 max-w-2xl mx-auto flex flex-col items-center text-center gap-4">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
            <span className="text-[10px] font-headline font-bold tracking-[0.2em] text-primary-fixed uppercase">
              PRÓXIMAMENTE
            </span>
          </div>

          {/* Title */}
          <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-[1.1]">
            ¿Es posible llevar una cuenta de{" "}
            <span className="text-primary-fixed text-glow">$2,000</span> a{" "}
            <span className="text-primary-fixed text-glow">$20,000 USD</span>{" "}
            operando en vivo?
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-lg">
            Del <strong className="text-on-surface">20 de abril al 3 de mayo</strong>, operamos una cuenta real frente
            a toda nuestra audiencia. Regístrate gratis para acceder a la plataforma y seguir el reto en tiempo real.
          </p>

          {/* ── FORM ── */}
          <div className="w-full bg-surface-container-high rounded-2xl border border-outline-variant/10 shadow-2xl p-5 sm:p-6 text-left relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/15 blur-3xl rounded-full pointer-events-none" />

            <form onSubmit={handleRegister} className="flex flex-col gap-3.5 relative z-10">
              {/* Row: name + email side by side on md+ */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-label uppercase tracking-widest text-on-surface-variant mb-1 ml-0.5">
                    Nombre completo
                  </label>
                  <input
                    required type="text" placeholder="Ej. Juan Pérez"
                    value={formName} onChange={e => setFormName(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-3 py-2.5 text-sm text-on-surface transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-label uppercase tracking-widest text-on-surface-variant mb-1 ml-0.5">
                    Email
                  </label>
                  <input
                    required type="email" placeholder="juan@email.com"
                    value={formEmail} onChange={e => setFormEmail(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-3 py-2.5 text-sm text-on-surface transition-all"
                  />
                </div>
              </div>

              {/* WhatsApp full-width */}
              <div>
                <label className="block text-[9px] font-label uppercase tracking-widest text-on-surface-variant mb-1 ml-0.5">
                  WhatsApp
                </label>
                <div className="flex gap-2">
                  <select
                    value={formCountry} onChange={e => setFormCountry(e.target.value)}
                    className="bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-2.5 py-2.5 text-sm text-on-surface transition-all cursor-pointer shrink-0 w-24"
                  >
                    {Object.keys(COUNTRY_DATA).map(c => (
                      <option key={c} value={c} className="bg-surface">
                        {COUNTRY_DATA[c].flag} {COUNTRY_DATA[c].code}
                      </option>
                    ))}
                  </select>
                  <input
                    required type="tel" placeholder="310 000 0000"
                    value={formPhone} onChange={e => setFormPhone(e.target.value)}
                    className="flex-1 bg-surface-container-highest border border-outline-variant/20 focus:border-secondary focus:ring-0 rounded-xl px-3 py-2.5 text-sm text-on-surface transition-all"
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit" disabled={isSubmitting}
                className="w-full kinetic-gradient text-on-primary-fixed font-headline font-extrabold py-3.5 rounded-xl text-sm sm:text-base hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "¡QUIERO SER PARTE DEL RETO!"}
              </button>

              <p className="text-[9px] text-center text-on-surface-variant leading-tight">
                Al registrarte, aceptas recibir comunicaciones sobre el reto y nuestra política de datos.
              </p>
            </form>
          </div>
        </section>

        {/* ── COUNTDOWN — below the fold ─────── */}
        <section className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <div className="w-full p-5 rounded-2xl bg-surface-container border border-outline-variant/20 shadow-xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none" />
            <p className="relative z-10 font-headline text-[10px] font-semibold tracking-widest text-primary/70 uppercase mb-4">
              Comenzamos el reto en:
            </p>
            <div className="relative z-10 grid grid-cols-4 gap-2">
              {[
                { val: pad(cdDays),  label: "Días" },
                { val: pad(cdHours), label: "Horas" },
                { val: pad(cdMins),  label: "Min" },
                { val: pad(cdSecs),  label: "Seg" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-headline font-bold text-on-surface tabular-nums">{val}</span>
                  <span className="text-[9px] font-label uppercase tracking-widest text-on-surface-variant mt-1">{label}</span>
                </div>
              ))}
            </div>
            <p className="relative z-10 mt-4 text-[10px] font-label text-on-surface/50">
              20 de Abril • 7:00 PM (Colombia)
            </p>
          </div>
        </section>

        {/* ── WHAT TO EXPECT ─────────────────── */}
        <section className="px-4 sm:px-6 py-8 pb-16 max-w-4xl mx-auto">
          <h2 className="font-headline font-bold text-xl sm:text-2xl md:text-3xl text-center mb-8">
            ¿Qué va a pasar en estas fechas?
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "monitoring",
                color: "text-primary-fixed",
                bg: "bg-primary/8",
                title: "Trading en vivo",
                sub: "Veras el crecimiento real de una cuenta de $2k a $20k.",
              },
              {
                icon: "psychology",
                color: "text-secondary-dim",
                bg: "bg-secondary/8",
                title: "Psicología y Mentalidad",
                sub: "Cómo dominar tu termostato financiero bajo presión.",
              },
              {
                icon: "school",
                color: "text-tertiary-fixed",
                bg: "bg-tertiary/8",
                title: "Educación Real",
                sub: "Detectar estafas, eliminar gastos hormiga y dominar inversiones.",
              },
            ].map(({ icon, color, bg, title, sub }) => (
              <div key={icon} className={`flex flex-col gap-3 p-5 rounded-2xl ${bg} border border-outline-variant/10 hover:border-outline-variant/30 transition-all`}>
                <span className={`material-symbols-outlined ${color} text-2xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {icon}
                </span>
                <h4 className="font-headline font-bold text-sm text-on-surface">{title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>

          {/* Highlight quote */}
          <div className="mt-8 p-5 border-l-2 border-primary-fixed bg-primary/5 rounded-r-2xl max-w-2xl mx-auto">
            <p className="font-body italic text-sm text-on-surface text-center">
              "Tu acceso te dará entrada a una plataforma interactiva con herramientas y dinámicas exclusivas."
            </p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="py-10 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-5">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              alt="Reto 2k a 20k"
              className="h-9 w-auto opacity-60 grayscale hover:grayscale-0 transition-all"
              src="https://lh3.googleusercontent.com/aida/ADBb0uinbkFg8lnkEkTf3Jwoi4AElHQmf8esQ8GjIvYtgtthwNymvyEPbbpLx6PvPKGS1wljfMegd7NSybtT1OawKHeEKhjyIEzU7dvEUsE3E0taGu90-TtEFWoYVOmAfXY5lbVkg0jYiiLFBXwbPuXgoa1I6_0fNFoUC2GPY_6Vsv0VCjuGFRQzTcS0IAFK26MfNcuk_yZPI2ihnIQ93j67lq_0KefsP0PdaZpssTfSXiyADamvsEMNIth0Lrs8gPCrQ-6D2mXECGgNYg"
            />
            <p className="font-body text-xs text-on-surface-variant">© 2026 Ingresarios · Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1.5">
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
