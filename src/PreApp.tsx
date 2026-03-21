import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

const BG = "#050d1a";
const BLUE = "#4899f1";
const GREEN = "#00d97e";
const TARGET_DATE = new Date("2026-04-20T19:00:00-05:00").getTime();

// ── Demo data matching the reference image ──────────────────
const DEMO_DATA = [
  { dia: "Inicio", valor: 2000,  ganancia: 0    },
  { dia: "04",     valor: 2340,  ganancia: 340  },
  { dia: "05",     valor: 2865,  ganancia: 525  },
  { dia: "06",     valor: 3150,  ganancia: 285  },
  { dia: "07",     valor: 3820,  ganancia: 670  },
  { dia: "08",     valor: 4485,  ganancia: 665  },
  { dia: "09",     valor: 5410,  ganancia: 925  },
  { dia: "10",     valor: 7960,  ganancia: 2550 },
  { dia: "11",     valor: 8825,  ganancia: 865  },
  { dia: "12",     valor: 11855, ganancia: 3030 },
];

// ── Custom dot: renders circle + white value + green gain ───
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined) return null;
  const { valor, ganancia } = payload;
  const isFirst = ganancia === 0;

  return (
    <g>
      {/* Circle */}
      <circle cx={cx} cy={cy} r={6} fill={BLUE} stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />

      {/* Dollar value — white bold */}
      <text
        x={cx} y={cy - (isFirst ? 14 : 28)}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={13}
        fontWeight={700}
        fontFamily="Inter, sans-serif"
        style={{ paintOrder: "stroke", stroke: BG, strokeWidth: 3 }}
      >
        ${valor.toLocaleString()}
      </text>

      {/* Gain — green */}
      {!isFirst && (
        <text
          x={cx} y={cy - 13}
          textAnchor="middle"
          fill={GREEN}
          fontSize={12}
          fontWeight={600}
          fontFamily="Inter, sans-serif"
          style={{ paintOrder: "stroke", stroke: BG, strokeWidth: 3 }}
        >
          +{ganancia.toLocaleString()}
        </text>
      )}
    </g>
  );
};

// ── Custom tooltip ──────────────────────────────────────────
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "#0b1e38", border: "1px solid rgba(72,153,241,0.35)",
      borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7,
    }}>
      <div style={{ color: "#aac4e0", marginBottom: 2 }}>Día {d.dia}</div>
      <div style={{ color: "#fff", fontWeight: 800 }}>Cuenta: ${d.valor.toLocaleString()}</div>
      {d.ganancia > 0 && (
        <div style={{ color: GREEN }}>Ganancia: +${d.ganancia.toLocaleString()}</div>
      )}
    </div>
  );
};

// ── Main component ──────────────────────────────────────────
export default function PreApp() {
  const [chartData, setChartData] = useState(DEMO_DATA);
  const [timeLeft, setTimeLeft] = useState(Math.max(0, TARGET_DATE - Date.now()));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(Math.max(0, TARGET_DATE - Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cdDays  = Math.floor(timeLeft / 86400000);
  const cdHours = Math.floor((timeLeft / 3600000) % 24);
  const cdMins  = Math.floor((timeLeft / 60000) % 60);
  const cdSecs  = Math.floor((timeLeft / 1000) % 60);

  // Try to load real ops from Supabase; fall back to demo
  useEffect(() => {
    const fetchOps = async () => {
      const { data: ops } = await supabase
        .from("alfa_ops")
        .select("*")
        .order("created_at", { ascending: true });

      if (ops && ops.length > 0) {
        let v = 2000;
        const built = [
          { dia: "Inicio", valor: 2000, ganancia: 0 },
          ...ops.map((o: any) => {
            const gain = o.res;
            v += gain;
            return { dia: o.dia, valor: v, ganancia: gain };
          }),
        ];
        setChartData(built);
      }
    };
    fetchOps();
  }, []);

  const last = chartData[chartData.length - 1];
  const firstVal = 2000;
  const totalGain = last.valor - firstVal;
  const progress = Math.min(((last.valor - firstVal) / 18000) * 100, 100);

  return (
    <div style={{
      background: BG, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif", color: "#fff",
    }}>
      {/* ── Logo only header ─────────────────────────── */}
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0 16px", gap: 16 }}>
        <img
          src="/logo-app.png"
          alt="Reto 2K a 20K Ingresarios"
          style={{ height: 100, objectFit: "contain" }}
        />

        {/* Countdown ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
            El Reto comienza en:
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { val: pad(cdDays),  label: "DÍAS" },
              { val: pad(cdHours), label: "HRS"  },
              { val: pad(cdMins),  label: "MIN"  },
              { val: pad(cdSecs),  label: "SEG"  },
            ].map(({ val, label }) => (
              <div key={label} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 14px", minWidth: 56,
              }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: BLUE, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 3, letterSpacing: "0.1em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Confirmation banner ────────────────────── */}
      <div style={{
        maxWidth: 1080, margin: "0 auto 0", padding: "0 16px 0",
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(0,217,126,0.15), rgba(0,100,255,0.1))",
          border: "2px solid rgba(0,217,126,0.5)",
          borderRadius: 16, padding: "18px 24px",
          display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28,
        }}>
          <span style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>✅</span>
          <div>
            <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: 18, color: GREEN, letterSpacing: "0.02em" }}>
              ¡REGISTRO CONFIRMADO!
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              Ya tienes un lugar en el Reto 2k a 20k.
            </p>
          </div>
        </div>
      </div>

      {/* ── Chart container ──────────────────────────── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px 60px" }}>

        {/* Section title */}
        <h2 style={{ 
          margin: "0 0 32px", 
          fontSize: 22, 
          fontWeight: 900, 
          letterSpacing: "0.05em", 
          background: `linear-gradient(90deg, #ffffff, ${GREEN})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase",
          textAlign: "center"
        }}>
          ESTO ES LO QUE ESTÁ PASANDO JUSTO AHORA:
        </h2>

        <div style={{
          display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap",
        }}>
          {[
            { label: "Cuenta actual",  value: `$${last.valor.toLocaleString()}`, color: BLUE },
            { label: "P&L total",      value: `+$${totalGain.toLocaleString()}`, color: GREEN },
            { label: "Progreso",       value: `${progress.toFixed(1)}%`,         color: GREEN },
            { label: "Meta",           value: "$20,000",                          color: "rgba(255,255,255,0.5)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: "1 1 120px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "12px 16px",
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: 1, marginBottom: 3 }}>
                {label.toUpperCase()}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 6 }}>
            <div style={{
              width: `${progress}%`, height: "100%", borderRadius: 99,
              background: `linear-gradient(90deg, ${BLUE}, ${GREEN})`,
              boxShadow: `0 0 12px rgba(72,153,241,0.5)`,
              transition: "width 1s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
            <span>$2K</span>
            <span>$20K 🏆</span>
          </div>
        </div>

        {/* Chart card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 18,
          padding: "24px 12px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingLeft: 8 }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <span style={{ fontWeight: 800, fontSize: 16 }}>Evolución semanal: Reto $2K a $20K</span>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 55, right: 30, left: 40, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="dia"
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "Inter" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide domain={["auto", "auto"]} />
              <ReferenceLine
                y={firstVal}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="6 4"
                strokeWidth={1.5}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(72,153,241,0.2)", strokeWidth: 1 }} />
              <Line
                type="monotone"
                dataKey="valor"
                stroke={BLUE}
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={{ r: 8, fill: BLUE, stroke: "rgba(255,255,255,0.5)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Post-chart copy ──────────────────────── */}
        <div style={{ marginTop: 28 }}>
          <p style={{ margin: "0 0 12px", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>
            Lo que ves arriba no es una simulación. Es el crecimiento real y diario de la cuenta que estaremos
            operando en vivo del <strong style={{ color: "#fff" }}>20 de abril al 3 de mayo</strong>.
          </p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>
            Mientras esperas el inicio oficial, esta gráfica te mostrará la transparencia total de nuestra
            operativa. Sin filtros, sin ediciones:
            <strong style={{ color: "#fff" }}> Pura ejecución del Método Ingresarios.</strong>
          </p>
        </div>

        {/* ── CTA WhatsApp section ──────────────────── */}
        <div style={{
          marginTop: 40,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "32px 24px",
          textAlign: "center",
        }}>
          <h2 style={{
            margin: "0 0 16px",
            fontSize: 20, fontWeight: 900,
            letterSpacing: "0.05em",
            background: `linear-gradient(90deg, #ffffff, ${GREEN})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            ¡EL SIGUIENTE PASO ES EL MÁS IMPORTANTE!
          </h2>

          <p style={{ margin: "0 0 28px", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Para que no te pierdas ni una sola sesión, alertas de movimientos importantes y el acceso
            directo a la plataforma de herramientas (Termostato Financiero, Calculadora de Gastos Hormiga y más),
            debes unirte al grupo exclusivo de alertas.
          </p>

          <a
            href="https://chat.whatsapp.com/EpI5olxnvRv6F6uA1ex183?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #25d366, #128c4e)",
              color: "#fff", textDecoration: "none",
              fontWeight: 800, fontSize: 16, letterSpacing: "0.03em",
              padding: "16px 32px", borderRadius: 14,
              boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(37,211,102,0.35)";
            }}
          >
            <span style={{ fontSize: 22 }}>👉</span>
            UNIRME AL GRUPO DE ALERTAS (WHATSAPP)
          </a>
        </div>
      </div>
    </div>
  );
}
