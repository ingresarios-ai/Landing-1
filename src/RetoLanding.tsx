import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── COLORES ───────────────────────────────────────
const BG = "#050d1a", CARD = "rgba(255,255,255,0.04)", BORDER = "rgba(255,255,255,0.1)";
const GREEN = "#00ff88", MUTED = "#5a7a94";
const TARGET_DATE = new Date("2026-04-20T19:00:00-05:00").getTime();
const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/jTugwykceKyJlATOSvkb/webhook-trigger/233a5165-6ebf-4cb3-8656-de35a4e7d813";

// ─── HELPERS DE PAÍSES ─────────────────────────────
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
      source: "Reto2026Landing"
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
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#fff", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      {/* HEADER */}
      <header style={{ padding: "20px", display: "flex", justifyContent: "center", borderBottom: `1px solid ${BORDER}` }}>
        <img src="/logo-app.png" alt="Reto 2K a 20K" style={{ height: "60px" }} />
      </header>

      {/* MAIN CONTENT */}
      <style>{`
        .reto-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
          align-items: flex-start;
          width: 100%;
          max-width: 1200px;
        }
        .reto-hero-box {
          grid-column: 1;
          grid-row: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .reto-summary-box {
          grid-column: 1;
          grid-row: 2;
        }
        .reto-form-box {
          grid-column: 2;
          grid-row: 1 / span 2;
          position: sticky;
          top: 120px;
        }
        .landing-main-padding {
          padding: 40px 20px;
        }
        .reto-hero-h1 {
          font-size: clamp(28px, 4vw, 44px);
        }
        @media (max-width: 900px) {
          .landing-main-padding { padding: 16px 16px !important; }
          .reto-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .reto-hero-box { order: 1; gap: 12px; }
          .reto-form-box { order: 2; position: static; width: 100%; }
          .reto-summary-box { order: 3; }
          .reto-hero-h1 { font-size: clamp(22px, 6vw, 28px) !important; }
          .premium-countdown-title { margin-bottom: 4px !important; }
        }
      `}</style>

      <main className="landing-content landing-main-padding" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div className="reto-grid">
          
          {/* HERO & COUNTDOWN */}
          <div className="reto-hero-box">
            <div style={{
              display: "inline-block",
              background: "rgba(0, 255, 136, 0.1)",
              border: `1px solid ${GREEN}`,
              color: GREEN,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1px",
              width: "max-content"
            }}>
              PRÓXIMAMENTE
            </div>
            
            <h1 className="reto-hero-h1" style={{ fontWeight: 900, lineHeight: 1.1, margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              ¿Es posible llevar una cuenta de <span style={{ color: GREEN }}>$2,000 a $20,000 USD</span> operando en vivo?
            </h1>
            
            <p style={{ fontSize: "15px", color: "#b0c4de", lineHeight: 1.5, margin: 0 }}>
              Estamos preparando una experiencia de trading real, sin filtros y en tiempo real. Del 20 de abril al 3 de mayo, abriremos las puertas de nuestra plataforma exclusiva para mostrarte el paso a paso del Método Ingresarios.
            </p>

            {/* COUNTDOWN */}
            <div className="countdown-marketing-wrapper" style={{ alignItems: "flex-start", marginTop: "10px" }}>
              <div className="premium-countdown-title" style={{ textAlign: "left", marginBottom: "12px", fontSize: "14px" }}>
                Comenzamos el reto en:
              </div>
              <div className="countdown-container-premium" style={{ justifyContent: "flex-start" }}>
                <div className="countdown-segment-premium">
                  <div className="segment-value-premium">{cdDays < 10 ? `0${cdDays}` : cdDays}</div>
                  <div className="segment-label-premium">DÍAS</div>
                </div>
                <div className="countdown-segment-premium">
                  <div className="segment-value-premium">{cdHours < 10 ? `0${cdHours}` : cdHours}</div>
                  <div className="segment-label-premium">HRS</div>
                </div>
                <div className="countdown-segment-premium">
                  <div className="segment-value-premium">{cdMins < 10 ? `0${cdMins}` : cdMins}</div>
                  <div className="segment-label-premium">MIN</div>
                </div>
                <div className="countdown-segment-premium">
                  <div className="segment-value-premium beat-animation">{cdSecs < 10 ? `0${cdSecs}` : cdSecs}</div>
                  <div className="segment-label-premium">SEG</div>
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY BOX */}
          <div className="reto-summary-box">
            <div style={{ padding: "30px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: "16px" }}>
              <h3 style={{ fontSize: "18px", color: "#fff", margin: "0 0 16px 0" }}>¿Qué va a pasar en estas fechas?</h3>
              <p style={{ color: MUTED, fontSize: "14px", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                Durante 14 días consecutivos, nos conectaremos a las 7:00 PM (Colombia) para operar una cuenta real frente a toda nuestra audiencia. No es un curso más; es una demostración de transparencia donde verás:
              </p>
              <ul style={{ color: "#fff", fontSize: "14px", lineHeight: 1.6, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px", margin: "0 0 16px 0" }}>
                <li><span style={{ color: GREEN }}>Trading en vivo:</span> El crecimiento de una cuenta de $2k a $20k.</li>
                <li><span style={{ color: GREEN }}>Psicología y Mentalidad:</span> Cómo dominar tu termostato financiero.</li>
                <li><span style={{ color: GREEN }}>Educación Real:</span> Detectar estafas, eliminar gastos hormiga y dominar inversiones de alto nivel.</li>
              </ul>
              <p style={{ color: MUTED, fontSize: "13px", fontStyle: "italic", margin: 0 }}>
                Tu acceso te dará entrada a una plataforma interactiva con herramientas y dinámicas exclusivas.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="reto-form-box">
            <div style={{ background: "rgba(10, 20, 35, 0.8)", border: `1px solid ${BORDER}`, borderRadius: "20px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
              <h2 style={{ fontSize: "20px", lineHeight: 1.4, margin: "0 0 24px 0", textAlign: "center", fontWeight: 700 }}>
                Asegura tu lugar en la lista de espera y sé el primero en entrar a la plataforma.
              </h2>
              
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: MUTED, marginBottom: "6px", fontWeight: 600 }}>Nombre Completo</label>
                  <input required type="text" placeholder="Escribe tu nombre" value={formName} onChange={e => setFormName(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.2)", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "14px 16px", color: "#fff", outline: "none", fontSize: "15px", boxSizing: "border-box" }} />
                </div>
                
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: MUTED, marginBottom: "6px", fontWeight: 600 }}>Correo Electrónico</label>
                  <input required type="email" placeholder="Tu correo electrónico principal" value={formEmail} onChange={e => setFormEmail(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.2)", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "14px 16px", color: "#fff", outline: "none", fontSize: "15px", boxSizing: "border-box" }} />
                </div>
                
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: MUTED, marginBottom: "6px", fontWeight: 600 }}>Teléfono (WhatsApp)</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={formCountry}
                      onChange={e => setFormCountry(e.target.value)}
                      style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "14px 8px", color: "#fff", outline: "none", fontSize: "14px", cursor: "pointer", width: "95px" }}
                    >
                      {Object.keys(COUNTRY_DATA).map(c => (
                        <option key={c} value={c} style={{ background: BG }}>
                          {COUNTRY_DATA[c].flag} {COUNTRY_DATA[c].code}
                        </option>
                      ))}
                    </select>
                    <input required type="tel" placeholder="WhatsApp para alertas" value={formPhone} onChange={e => setFormPhone(e.target.value)}
                      style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "14px 16px", color: "#fff", outline: "none", fontSize: "15px", boxSizing: "border-box", width: "100%" }} />
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" 
                  style={{
                    background: isSubmitting ? "#333" : `linear-gradient(90deg, ${GREEN}, #00b2ff)`,
                    color: isSubmitting ? "#888" : "#001034",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    fontSize: "14px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    marginTop: "12px",
                    transition: "all 0.3s ease",
                    boxShadow: isSubmitting ? "none" : "0 8px 24px rgba(0, 255, 136, 0.4)",
                  }}>
                  {isSubmitting ? "PROCESANDO..." : "¡QUIERO SER PARTE DEL RETO!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "auto" }}>
        <p style={{ color: "#fff", fontSize: "14px", margin: 0, fontWeight: 500 }}>
          © 2026 Ingresarios - Todos los derechos reservados.
        </p>
        <p style={{ color: MUTED, fontSize: "12px", margin: 0 }}>
          Nota de privacidad: Tus datos están seguros y se usarán únicamente para información relativa al reto.
        </p>
      </footer>
    </div>
  );
}
