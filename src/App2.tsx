import { useState } from "react";

// ── QUIZ DATA ─────────────────────────────────────────────────
const QUIZ = [
  {
    id: 1, emoji: "📅",
    pregunta: "¿Cuánto tiempo llevas operando en mercados financieros?",
    opciones: [
      { texto: "Soy completamente nuevo, quiero aprender", valor: "explorador" },
      { texto: "Menos de 1 año, todavía aprendiendo", valor: "explorador" },
      { texto: "1 a 3 años, operando con resultados mixtos", valor: "arquitecto" },
      { texto: "Más de 3 años, tengo experiencia real", valor: "samurai" },
    ]
  },
  {
    id: 2, emoji: "🧨",
    pregunta: "¿Cuál es tu mayor desafío como trader en este momento?",
    opciones: [
      { texto: "No saber por dónde empezar ni qué estudiar", valor: "explorador" },
      { texto: "La disciplina — me cuesta respetar el plan", valor: "samurai" },
      { texto: "El control emocional — el miedo y la codicia me dominan", valor: "alquimista" },
      { texto: "La consistencia — tengo rachas buenas y malas", valor: "arquitecto" },
    ]
  },
  {
    id: 3, emoji: "🎲",
    pregunta: "¿Cómo describes tu relación con el riesgo?",
    opciones: [
      { texto: "Conservador — prefiero ganar poco a perder algo", valor: "arquitecto" },
      { texto: "Calculado — evalúo el R:R antes de cada operación", valor: "samurai" },
      { texto: "Agresivo — asumo riesgos altos buscando retornos altos", valor: "cazador" },
      { texto: "Inconsistente — cambia según mi estado de ánimo", valor: "explorador" },
    ]
  },
  {
    id: 4, emoji: "⏰",
    pregunta: "¿Cuánto tiempo real dedicas al trading cada día?",
    opciones: [
      { texto: "Menos de 1 hora (trading pasivo o swing)", valor: "arquitecto" },
      { texto: "1 a 3 horas (seguimiento activo)", valor: "samurai" },
      { texto: "3 a 6 horas (day trader semi-profesional)", valor: "cazador" },
      { texto: "Más de 6 horas (full-time)", valor: "alquimista" },
    ]
  },
  {
    id: 5, emoji: "🎯",
    pregunta: "¿Cuál es tu principal objetivo financiero con el trading?",
    opciones: [
      { texto: "Libertad financiera total — vivir del trading", valor: "alquimista" },
      { texto: "Ingresos complementarios de $500-2000 USD/mes", valor: "arquitecto" },
      { texto: "Proteger y hacer crecer mis ahorros", valor: "samurai" },
      { texto: "Entender los mercados y aprender a invertir", valor: "explorador" },
    ]
  },
  {
    id: 6, emoji: "📊",
    pregunta: "¿Qué tipo de análisis usas más en tus operaciones?",
    opciones: [
      { texto: "Análisis técnico — gráficos, patrones, indicadores", valor: "cazador" },
      { texto: "Price Action puro — sin indicadores, solo velas", valor: "samurai" },
      { texto: "Fundamental + técnico combinado", valor: "alquimista" },
      { texto: "Todavía estoy aprendiendo los distintos métodos", valor: "explorador" },
    ]
  },
  {
    id: 7, emoji: "😤",
    pregunta: "¿Cómo reaccionas normalmente después de una pérdida?",
    opciones: [
      { texto: "Intento recuperarla inmediatamente (revenge trading)", valor: "explorador" },
      { texto: "Tomo distancia y analizo qué falló antes de volver", valor: "samurai" },
      { texto: "Me afecta durante horas o días — me bloquea", valor: "alquimista" },
      { texto: "Lo acepto como parte del proceso y sigo mi plan", valor: "arquitecto" },
    ]
  },
  {
    id: 8, emoji: "💎",
    pregunta: "¿Cuál crees que es tu mayor fortaleza como trader?",
    opciones: [
      { texto: "La paciencia — espero mis setups con disciplina", valor: "samurai" },
      { texto: "La velocidad — identifico oportunidades rápido", valor: "cazador" },
      { texto: "El análisis — proceso mucha información antes de actuar", valor: "alquimista" },
      { texto: "La constancia — soy dedicado aunque los resultados no llegan", valor: "explorador" },
    ]
  },
  {
    id: 9, emoji: "🚀",
    pregunta: "¿Qué tipo de trader quieres ser en los próximos 12 meses?",
    opciones: [
      { texto: "Trader institucional con metodología sólida y probada", valor: "samurai" },
      { texto: "Trader de alto rendimiento con estrategias sistemáticas", valor: "arquitecto" },
      { texto: "Trader full-time viviendo de los mercados con libertad total", valor: "alquimista" },
      { texto: "Trader activo con ingresos consistentes como complemento", valor: "cazador" },
    ]
  },
];

const ARQUETIPOS: Record<string, any> = {
  explorador: {
    nombre: "El Explorador", emoji: "🧭", color: "#00d4ff",
    subtitulo: "Curioso, hambriento de conocimiento, en plena construcción",
    descripcion: "Estás en la etapa más valiosa del journey: el inicio consciente. Tienes la mente abierta y la motivación necesaria para construir una base sólida. El método PEDEM fue diseñado exactamente para traders como tú — te dará estructura, claridad y un camino probado para avanzar sin los errores que destruyen cuentas en los primeros años.",
    fortaleza: "Mente abierta y disposición al aprendizaje",
    desafio: "Construir estructura antes de arriesgar capital real",
    proxPaso: "Completa el Reto de la Sombra 7 días para conocerte como trader",
    quote: "\"El trader más peligroso es el que cree que ya sabe.\" — Juan, INGRESARIOS",
  },
  arquitecto: {
    nombre: "El Arquitecto", emoji: "📐", color: "#00f5a0",
    subtitulo: "Sistemático, metódico, construye para el largo plazo",
    descripcion: "Piensas en sistemas, no en trades aislados. Entiendes que la consistencia viene de los procesos. Tu reto es ejecutar con disciplina lo que ya sabes en teoría. PEDEM es tu lenguaje natural — úsalo para cerrar la brecha entre saber y hacer. La documentación de tus trades será tu mayor ventaja competitiva.",
    fortaleza: "Pensamiento sistemático y capacidad de análisis",
    desafio: "Pasar del análisis parálisis a la ejecución confiante",
    proxPaso: "Empieza el Simulador y aplica PEDEM en cada trade hoy",
    quote: "\"Un buen sistema mediocre ejecutado perfectamente supera a un sistema perfecto mal ejecutado.\"",
  },
  samurai: {
    nombre: "El Samurái", emoji: "⚔️", color: "#bf5fff",
    subtitulo: "Disciplinado, paciente, respeta el proceso sobre el resultado",
    descripcion: "Tienes la mentalidad correcta — operas desde la paciencia y el respeto por el riesgo. Tu trading se parece más al arte que al juego. El siguiente nivel para ti es la maestría: afinar el timing, optimizar tus indicadores y construir un edge estadístico comprobable. El Reto del Flow te llevará a tu estado óptimo de forma consistente.",
    fortaleza: "Disciplina emocional y respeto por el plan",
    desafio: "Salir de la zona de comfort y escalar resultados",
    proxPaso: "Activa el Reto del Flow para llevar tu disciplina al siguiente nivel",
    quote: "\"El samurái no desenvaina por emoción — desenvaina por preparación.\" — Bushido",
  },
  cazador: {
    nombre: "El Cazador", emoji: "🎯", color: "#ff9500",
    subtitulo: "Rápido, agresivo, busca la oportunidad antes que el proceso",
    descripcion: "Tienes instinto de mercado y velocidad de reacción — eso es un don real. Tu reto es canalizar esa energía con estructura. Sin un plan sólido, el cazador se convierte en la presa. El método PEDEM es la diferencia entre cazar con trampa y cazar al azar. Con disciplina, tu velocidad se convierte en tu mayor ventaja.",
    fortaleza: "Velocidad de identificación y ejecución",
    desafio: "Frenar el impulso y planificar antes de disparar",
    proxPaso: "Usa el modal PLANEAR antes de cada trade — sin excepción",
    quote: "\"La velocidad sin dirección es solo caos con energía.\"",
  },
  alquimista: {
    nombre: "El Alquimista", emoji: "🔮", color: "#ffd700",
    subtitulo: "Integrador, profundo, busca transformar conocimiento en oro",
    descripcion: "Combinas múltiples frameworks, entiendes que el trading es psicología, probabilidad y proceso. Estás listo para el nivel institucional. Tu siguiente salto no es técnico — es mental. El Reto de la Sombra te revelará los últimos bloques inconscientes que limitan tu cuenta. Con GENY IA como coach, tienes acceso a análisis que antes solo tenían los traders de Bloomberg.",
    fortaleza: "Visión holística y capacidad de integración",
    desafio: "Convertir la complejidad en simplicidad ejecutable",
    proxPaso: "Habla con GENY IA y pídele que analice tu arquetipo en profundidad",
    quote: "\"La alquimia del trading: convertir incertidumbre en probabilidad repetible.\" — Juan, Bloomberg",
  },
};

// ── MARKET DATA ───────────────────────────────────────────────
const genData = (base: number, vol: number, n = 120) => {
  let p = base;
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (n - i));
    p = Math.max(p + (Math.random() - 0.47) * vol, base * 0.65);
    return { t: d.toLocaleDateString("es", { month:"short", day:"numeric" }), c: +p.toFixed(2) };
  });
};
const SYMS: Record<string, any> = {
  SPX:  { label:"S&P 500",    base:5200, vol:38,  color:"#00f5a0", lot:1  },
  QQQ:  { label:"NASDAQ QQQ", base:445,  vol:6,   color:"#00d4ff", lot:10 },
  AAPL: { label:"Apple Inc.", base:185,  vol:3.5, color:"#bf5fff", lot:10 },
  TSLA: { label:"Tesla Inc.", base:240,  vol:9,   color:"#ff6b6b", lot:10 },
  NVDA: { label:"NVIDIA",     base:875,  vol:18,  color:"#ffd700", lot:1  },
};
const MD: Record<string, any[]> = {}; 
Object.keys(SYMS).forEach(s => { MD[s] = genData(SYMS[s].base, SYMS[s].vol); });

// ── UTILS ─────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  app:      { background:"#080c10", minHeight:"100vh", color:"#dde", fontFamily:"'Inter',system-ui,sans-serif", fontSize:13 },
  card:     { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:12, padding:16 },
  cardSm:   { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:10, padding:12 },
  inp:      { background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:8, padding:"9px 12px", color:"#fff", fontSize:13, width:"100%", outline:"none", boxSizing:"border-box" },
  textarea: { background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:8, padding:"9px 12px", color:"#fff", fontSize:13, width:"100%", outline:"none", resize:"vertical", boxSizing:"border-box", lineHeight:1.6 },
  label:    { color:"#888", fontSize:11, marginBottom:4, display:"block", textTransform:"uppercase", letterSpacing:1 },
};
const glowBtn = (c="#00f5a0",sm?: boolean): React.CSSProperties => ({ background:`linear-gradient(135deg,${c}22,${c}44)`, border:`1px solid ${c}77`, color:c, borderRadius:8, padding:sm?"7px 14px":"10px 22px", cursor:"pointer", fontWeight:700, fontSize:sm?12:13, transition:"all .2s" });

// ── PREMIUM ───────────────────────────────────────────────────
// ── PREMIUM ───────────────────────────────────────────────────
// Removed unused PREMIUM constants
// ════════════════════════════════════════════════════════════════
// QUIZ SCREEN
// ════════════════════════════════════════════════════════════════
function QuizScreen({ onComplete }: { onComplete: (name: string, arq: string) => void }) {
  const [step, setStep]       = useState(-1); // -1 = splash, 0-8 = preguntas
  const [nombre, setNombre]   = useState("");
  const [respuestas, setResp] = useState<string[]>([]);
  const [seleccion, setSel]   = useState<string | null>(null);
  const [animating, setAnim]  = useState(false);

  const calcArquetipo = (resps: string[]) => {
    const conteo: Record<string, number> = {};
    resps.forEach(v => { conteo[v] = (conteo[v]||0)+1; });
    return Object.entries(conteo).sort((a,b)=>b[1]-a[1])[0][0];
  };

  const handleOpcion = (valor: string) => {
    if (animating) return;
    setSel(valor); setAnim(true);
    setTimeout(() => {
      const nuevas = [...respuestas, valor];
      setResp(nuevas); setSel(null); setAnim(false);
      if (step < 8) setStep(s=>s+1);
      else { const arq = calcArquetipo(nuevas); onComplete(nombre||"Trader", arq); }
    }, 520);
  };

  const pct = step < 0 ? 0 : Math.round(((step+1)/9)*100);
  const q   = QUIZ[step];

  if (step === -1) return (
    <div style={{ minHeight:"100vh", background:"#080c10", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ maxWidth:440, width:"100%", textAlign:"center" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:56, marginBottom:12 }}>⚡</div>
          <div style={{ fontWeight:900, fontSize:32, background:"linear-gradient(90deg,#00f5a0,#00d4ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-1 }}>INGRESARIOS</div>
          <div style={{ color:"#444", fontSize:13, marginTop:6, letterSpacing:3, textTransform:"uppercase" }}>Trading · PEDEM · Flow · Sombra</div>
        </div>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontWeight:900, fontSize:22, lineHeight:1.3, color:"#fff", marginBottom:10 }}>
            Descubre tu Arquetipo<br />como Trader
          </div>
          <div style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>
            9 preguntas · 2 minutos · Resultado personalizado<br />con tu camino PEDEM y tu reto ideal
          </div>
        </div>
        <div style={{ marginBottom:22 }}>
          <div style={{ color:"#888", fontSize:12, marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>¿Cómo te llamamos?</div>
          <input style={{ ...S.inp, textAlign:"center", fontSize:15 }} placeholder="Tu nombre o apodo de trader" value={nombre} onChange={e=>setNombre(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setStep(0)} />
        </div>
        <button onClick={()=>setStep(0)} style={{ background:"linear-gradient(135deg,#00f5a0,#00d4ff)", border:"none", borderRadius:12, padding:"16px 40px", cursor:"pointer", fontWeight:900, fontSize:16, color:"#000", width:"100%", boxShadow:"0 4px 32px #00f5a033" }}>
          Comenzar el Quiz →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#080c10", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ maxWidth:540, width:"100%" }}>
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontWeight:900, fontSize:13, background:"linear-gradient(90deg,#00f5a0,#00d4ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>⚡ INGRESARIOS</div>
            <div style={{ color:"#555", fontSize:12 }}>Pregunta {step+1} de 9</div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:6, height:6 }}>
            <div style={{ background:"linear-gradient(90deg,#00f5a0,#00d4ff)", borderRadius:6, height:6, width:`${pct}%`, transition:"width .5s ease" }}/>
          </div>
        </div>
        <div style={{ ...S.card, marginBottom:16, padding:"28px 24px", textAlign:"center", background:"rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize:44, marginBottom:16 }}>{q.emoji}</div>
          <div style={{ fontWeight:800, fontSize:18, lineHeight:1.4, color:"#fff" }}>{q.pregunta}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {q.opciones.map((op, i) => (
            <button key={i} onClick={()=>handleOpcion(op.valor)} style={{ background:seleccion===op.valor?"rgba(0,245,160,0.15)":"rgba(255,255,255,0.03)", border:`1.5px solid ${seleccion===op.valor?"#00f5a0":"rgba(255,255,255,0.1)"}`, borderRadius:12, padding:"14px 20px", cursor:"pointer", color:seleccion===op.valor?"#00f5a0":"#ccc", fontSize:14, textAlign:"left", fontWeight:seleccion===op.valor?700:400 }}>
              <span style={{ marginRight:12, color:seleccion===op.valor?"#00f5a0":"#444", fontWeight:700 }}>{String.fromCharCode(65+i)}.</span>
              {op.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// RESULTADO SCREEN
// ════════════════════════════════════════════════════════════════
function ResultadoScreen({ arquetipo, onEnter }: { nombre: string, arquetipo: string, onEnter: () => void }) {
  const A = ARQUETIPOS[arquetipo];

  return (
    <div style={{ minHeight:"100vh", background:"#080c10", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ maxWidth:560, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:64, marginBottom:12 }}>{A.emoji}</div>
          <div style={{ fontWeight:900, fontSize:28, color:A.color, marginBottom:6 }}>{A.nombre}</div>
          <div style={{ color:"#888", fontSize:14, fontStyle:"italic" }}>{A.subtitulo}</div>
        </div>
        <div style={{ ...S.card, marginBottom:14, borderColor:`${A.color}33`, background:`linear-gradient(135deg,${A.color}08,rgba(255,255,255,0.02))`, padding:"20px 22px" }}>
          <div style={{ color:"#ccc", fontSize:14, lineHeight:1.8 }}>{A.descripcion}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
          {[["💪 Fortaleza",A.fortaleza,"#00f5a0"],["⚡ Desafío",A.desafio,"#ff9500"],["🚀 Próximo Paso",A.proxPaso,"#00d4ff"]].map(([l,v,c])=>(
            <div key={l as string} style={{ ...S.cardSm, borderTop:`3px solid ${c}` }}>
              <div style={{ color:c as string, fontSize:10, fontWeight:700, marginBottom:6 }}>{l as string}</div>
              <div style={{ color:"#ccc", fontSize:12, lineHeight:1.5 }}>{v as string}</div>
            </div>
          ))}
        </div>
        <button onClick={onEnter} style={{ background:`linear-gradient(135deg,${A.color},${A.color}aa)`, border:"none", borderRadius:14, padding:"18px 0", cursor:"pointer", fontWeight:900, fontSize:17, color:"#000", width:"100%", boxShadow:`0 4px 32px ${A.color}44` }}>
          Entrar al Simulador INGRESARIOS {A.emoji}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SIMULADOR & DASHBOARD (Partial Implementation for /app2 Route)
// ════════════════════════════════════════════════════════════════
export default function App2() {
  const [appState, setAppState] = useState("quiz");
  const [nombre, setNombre]     = useState("");
  const [arquetipo, setArq]     = useState("explorador");

  if(appState==="quiz")  return <QuizScreen onComplete={(n,a)=>{setNombre(n);setArq(a);setAppState("resultado");}}/>;
  if(appState==="resultado") return <ResultadoScreen nombre={nombre} arquetipo={arquetipo} onEnter={()=>setAppState("app")}/>;

  const A = ARQUETIPOS[arquetipo];

  return (
    <div style={S.app}>
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"20px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ fontWeight:900,fontSize:17,background:"linear-gradient(90deg,#00f5a0,#00d4ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>⚡ INGRESARIOS V2</div>
        </div>
        <div style={{ display:"flex",gap:7,alignItems:"center" }}>
           <div style={{ ...S.cardSm,padding:"4px 10px" }}><span style={{ color:A.color,fontWeight:700 }}>{A.emoji} {nombre}</span></div>
        </div>
      </div>
      <div style={{ padding:40, textAlign: 'center' }}>
         <h1 style={{ fontSize: 32, fontWeight: 900, color: A.color }}>Dashboard Beta 0.5</h1>
         <p style={{ color: '#888', marginTop: 10 }}>Has completado el Quiz. Tu arquetipo es {A.nombre}.</p>
         <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={S.card}>
                <h3>Simulador</h3>
                <p>Módulos de simulación cargados...</p>
            </div>
            <div style={S.card}>
                <h3>PEDEM</h3>
                <p>Planear &rarr; Ejecutar &rarr; Documentar</p>
            </div>
         </div>
         <button style={{ ...glowBtn(A.color), marginTop: 40 }} onClick={() => setAppState("quiz")}>Repetir Quiz</button>
      </div>
    </div>
  );
}
