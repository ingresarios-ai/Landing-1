import { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from "recharts";
import { Home, BarChart2, BookOpen, Users, Shield } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Inicializar cliente Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── COLORES ───────────────────────────────────────
const BG = "#050d1a", CARD = "rgba(255,255,255,0.04)", BORDER = "rgba(255,255,255,0.1)";
const GREEN = "#00ff88", MUTED = "#5a7a94", FONT = "'Inter',sans-serif";
const ADMIN_PASS = "alfa2025";

// ─── HELPERS DE PAÍSES ─────────────────────────────
const COUNTRY_DATA: Record<string, { flag: string; code: string }> = {
  MX: { flag: "🇲🇽", code: "+52" },
  CO: { flag: "🇨🇴", code: "+57" },
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
  SV: { flag: "🇸🇻", code: "+503" },
  NI: { flag: "🇳🇮", code: "+505" },
  BO: { flag: "🇧🇴", code: "+591" },
  PY: { flag: "🇵🇾", code: "+595" },
};

// ─── DATOS INICIALES ───────────────────────────────

const buildEquity = (ops: any[]) => {
  let v = 2000;
  return [{ dia:"Inicio", valor:2000 }, ...ops.map((o: any) => { v += o.res; return { dia:o.dia, valor:v }; })];
};

const initFeed = [
  { u:"Carlos M. 🇲🇽",t:"¡Increíble la operación del D7! 🔥",time:"hace 2h",likes:12 },
  { u:"Ana R. 🇨🇴",t:"¿Cómo manejan el miedo después de una pérdida? Yo me bloqueo.",time:"hace 3h",likes:8 },
  { u:"Diego F. 🇦🇷",t:"La mini clase de la Sombra me rompió la cabeza. Gracias Comando.",time:"hace 5h",likes:24 },
];

const initClases = [
  { id:1,t:"El Flow State del Trader",sub:"¿Por qué los mejores operan 'en zona'?",dur:"4 min",xp:50,open:true,done:true,cat:"Flow" },
  { id:2,t:"La Sombra que Sabotea",sub:"El patrón inconsciente que te hace perder",dur:"5 min",xp:75,open:true,done:true,cat:"Sombra" },
  { id:3,t:"PEDEM en Acción",sub:"Cómo el Comando planea cada operación",dur:"3 min",xp:50,open:true,done:false,cat:"PEDEM" },
  { id:4,t:"El Enemigo Interno",sub:"Miedo, avaricia y ego",dur:"5 min",xp:75,open:false,done:false,cat:"Sombra" },
  { id:5,t:"Triggers de Flow",sub:"Rituales pre-mercado para estado óptimo",dur:"4 min",xp:60,open:false,done:false,cat:"Flow" },
  { id:6,t:"Risk Management Real",sub:"Por qué el 2% no es suficiente para crecer",dur:"6 min",xp:100,open:false,done:false,cat:"PEDEM" },
  { id:7,t:"Consistencia = Sistema",sub:"El secreto del Comando ALFA",dur:"5 min",xp:100,open:false,done:false,cat:"PEDEM" },
];

const lboard = [
  { pos:1,n:"Carlos M.",pais:"🇲🇽",coins:1840,streak:7 },
  { pos:2,n:"Ana R.",pais:"🇨🇴",coins:1650,streak:7 },
  { pos:3,n:"Diego F.",pais:"🇦🇷",coins:1490,streak:6 },
  { pos:4,n:"María L.",pais:"🇨🇱",coins:1320,streak:5 },
  { pos:5,n:"Tú",pais:"🇨🇴",coins:1180,streak:7,yo:true },
  { pos:6,n:"Roberto K.",pais:"🇵🇪",coins:980,streak:4 },
];

const badges = [
  { id:1,n:"Día 1",ico:"🚀",desc:"Completaste el primer día",ok:true },
  { id:2,n:"Primera Semana",ico:"⭐",desc:"7 días en el reto",ok:true },
  { id:3,n:"Racha x7",ico:"🔥",desc:"7 días consecutivos activo",ok:true },
  { id:4,n:"Guerrero del Flow",ico:"⚡",desc:"3 mini clases de Flow completadas",ok:false },
  { id:5,n:"Detective Sombra",ico:"🔮",desc:"Completaste Sombra 1 y 2",ok:false },
  { id:6,n:"PEDEM Master",ico:"📋",desc:"Todos los módulos PEDEM completados",ok:false },
  { id:7,n:"20K Alcanzado",ico:"🏆",desc:"Llegaste a la meta final",ok:false },
];

// ─── HELPERS ───────────────────────────────────────
const inp = (ph: string, val: string, set: (v: string) => void, type = "text", ico?: string | null, small?: boolean) => (
  <div style={{ marginBottom: small?8:12, position:"relative" }}>
    {ico && <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14 }}>{ico}</span>}
    <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}
      style={{ width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:ico?"11px 11px 11px 36px":"11px 12px",color:"#fff",fontSize:small?12:13,outline:"none",boxSizing:"border-box" }} />
  </div>
);

const YTEmbed = ({ url, style, className }: { url: string; style?: React.CSSProperties; className?: string }) => {
  if (!url) return null;
  const getID = (u: string) => { try { const m = u.match(/(?:youtu\.be\/|v=|\/embed\/)([^&?/]+)/); return m?m[1]:null; } catch { return null; }};
  const id = getID(url);
  if (!id) return <div className={className} style={{ ...style, display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.05)",borderRadius:12,color:MUTED,fontSize:13 }}>URL de video no válida</div>;
  return <iframe className={className} src={`https://www.youtube.com/embed/${id}?rel=0`} style={{ ...style, border:"none",borderRadius:12 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
};

// ─── APP PRINCIPAL ──────────────────────────────────
export default function App() {
  const [screen, setScreenState] = useState(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p === "/admin") return "admin";
      if (p === "/registro" || p === "/reg") return "reg";
      if (p === "/app" || p === "/dashboard") return "app";
    }
    return "intro";
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p === "/admin") setScreenState("admin");
      else if (p === "/registro" || p === "/reg") setScreenState("reg");
      else if (p === "/app" || p === "/dashboard") setScreenState("app");
      else setScreenState("intro");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setScreen = (s: string) => {
    setScreenState(s);
    let path = "/";
    if (s === "admin") path = "/admin";
    if (s === "reg") path = "/registro";
    if (s === "app") path = "/app";
    window.history.pushState({}, "", path);
  };
  const [tab, setTab] = useState("dash");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [country, setCountry] = useState({ flag: "🌐", code: "" });
  const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/jTugwykceKyJlATOSvkb/webhook-trigger/233a5165-6ebf-4cb3-8656-de35a4e7d813";
  const [siguiendoAlfa, setSiguiendoAlfa] = useState(false);
  const [coins, setCoins] = useState(1180);
  const [streak] = useState(7);
  const [toast, setToast] = useState<string | null>(null);
  const [feed, setFeed] = useState(initFeed);
  const [comentario, setComentario] = useState("");
  const [share, setShare] = useState(false);
  const [, setGhlStatus] = useState<string | null>(null);
  const [regErrors, setRegErrors] = useState<any>({});

  // Detectar país al cargar registro
  useEffect(() => {
    if (screen === "reg") {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          const c = COUNTRY_DATA[data.country_code] || { flag: "🌐", code: "+" + data.country_calling_code };
          setCountry(c);
          if (!wa) setWa(c.code + " ");
        })
        .catch(() => setCountry({ flag: "🗺️", code: "+" }));
    }
  }, [screen]);

  // Admin state
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState(false);
  // Comando ALFA data (editable por admin)
  // Comando ALFA data (editable por admin)
  const [alfaOps, setAlfaOps] = useState<any[]>([]);
  const [alfaVideos, setAlfaVideos] = useState<any[]>([]);
  const [alfaUsers, setAlfaUsers] = useState<any[]>([]);
  const [alfaVideoUrl, setAlfaVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [introVideoUrl, setIntroVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [alfaDia, setAlfaDia] = useState(1);
  const [aVideoDia, setAVideoDia] = useState(1);
  const [editingOpId, setEditingOpId] = useState<any>(null);
  const [editingVideoId, setEditingVideoId] = useState<any>(null);

  // Cargar datos de Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Configuraciones (solo intro_video_url)
      const { data: config } = await supabase.from("app_config").select("*");
      if (config) {
        config.forEach(c => {
          if (c.key === "intro_video_url") setIntroVideoUrl(c.value);
        });
      }
      // Videos del día (historial)
      const { data: vids } = await supabase.from("alfa_videos").select("*").order("dia", { ascending: true });
      if (vids && vids.length > 0) {
        setAlfaVideos(vids);
        setAVideoDia(vids[vids.length - 1].dia + 1);
        setAlfaVideoUrl(vids[vids.length - 1].url);
      }
      // Bitácora de operaciones
      const { data: ops } = await supabase.from("alfa_ops").select("*").order("created_at", { ascending: true });
      if (ops) {
        setAlfaOps(ops);
        if (ops.length > 0) setAlfaDia(Number(ops[ops.length - 1].dia.replace("D","")) + 1);
      }
      // Usuarios registrados
      const { data: users } = await supabase.from("alfa_users").select("*").order("created_at", { ascending: false });
      if (users) setAlfaUsers(users);
    };
    fetchData();
  }, []);
  // Admin form
  const [aInst, setAInst] = useState("SPX 0DTE");
  const [aTipo, setATipo] = useState("Iron Condor");
  const [aEntry, setAEntry] = useState("");
  const [aRes, setARes] = useState("");
  const [aNota, setANota] = useState("");
  const [aVideo, setAVideo] = useState("");
  const [aIntroVideo, setAIntroVideo] = useState("");
  const [adminTab, setAdminTab] = useState("video-dia"); // 'intro', 'video-dia', 'bitacora', 'users'

  // Usuario: bitácora personal
  const [userOps, setUserOps] = useState<any[]>([]);
  const [uInst, setUInst] = useState("");
  const [uTipo, setUTipo] = useState("");
  const [uEntry, setUEntry] = useState("");
  const [uRes, setURes] = useState("");
  const [uNota, setUNota] = useState("");
  const [mostrarFormUser, setMostrarFormUser] = useState(false);

  const alfaEquity = buildEquity(alfaOps);
  const alfaPnL = alfaOps.reduce((s,o)=>s+o.res,0);
  const alfaCuenta = 2000 + alfaPnL;
  const alfaProgreso = Math.min(((alfaCuenta-2000)/18000)*100, 100);
  const alfaWR = alfaOps.length ? Math.round(alfaOps.filter((o: any)=>o.res>0).length/alfaOps.length*100) : 0;

  const userEquity = buildEquity(userOps);
  const userPnL = userOps.reduce((s,o: any)=>s+o.res,0);
  const userCuenta = 2000 + userPnL;

  const award = (c: number, msg: string) => { setCoins(v=>v+c); setToast(msg); setTimeout(()=>setToast(null),2500); };

  const getCountry = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return "Desconocido"; }};

  const sendToGHL = async (tipo: string, extra: any = {}) => {
    setGhlStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          nombre,
          email,
          telefono: wa.replace(/\s+/g, ""),
          fecha_registro: new Date().toISOString(),
          pais: getCountry(),
          tags: ["Reto2K20K", tipo === "registro" ? "NuevoLead" : "RetoCompletado"],
          ...extra,
        }),
      });
      if (tipo === "registro") {
        const u = { nombre, email, telefono: wa.replace(/\s+/g, ""), pais: getCountry() };
        await supabase.from("alfa_users").insert([u]);
        setAlfaUsers(prev => [u, ...prev]);
      }
      setGhlStatus("ok");
      setToast(tipo === "registro" ? "✅ Registro exitoso" : "🏆 Notificación enviada");
    } catch {
      setGhlStatus("error");
      setToast("⚠️ Error al conectar");
    }
    setTimeout(() => {
      setGhlStatus(null);
      setToast(null);
    }, 3000);
  };

  const addAlfaOp = async () => {
    if (!aEntry || !aRes) return;
    const n = alfaDia;
    const emoji = Number(aRes)>0?"✅":Number(aRes)<0?"🛑":"⚠️";
    const op = { dia:`D${n}`,inst:aInst,tipo:aTipo,entry:aEntry,res:Number(aRes),nota:aNota,e:emoji };
    
    if (editingOpId) {
      // Update
      setAlfaOps(prev => prev.map(o => o.id === editingOpId ? { ...o, ...op } : o));
      setEditingOpId(null);
      setAEntry(""); setARes(""); setANota("");
      await supabase.from("alfa_ops").update(op).eq("id", editingOpId);
      award(0, "✅ Operación actualizada");
    } else {
      // Insert optimistic
      const tempId = Date.now();
      setAlfaOps(prev=>[...prev,{ ...op, id: tempId }]);
      setAEntry(""); setARes(""); setANota(""); setAlfaDia(n+1);
      award(0, "✅ Operación guardada localmente...");
      
      const { data } = await supabase.from("alfa_ops").insert([op]).select();
      if (data && data[0]) {
        setAlfaOps(prev => prev.map(o => o.id === tempId ? data[0] : o));
        setToast("✅ Operación sincronizada con Supabase");
      } else {
        setToast("⚠️ Error guardando en Supabase");
      }
    }
    setTimeout(()=>setToast(null),2500);
  };

  const editOp = (o: any) => {
    setEditingOpId(o.id);
    setAInst(o.inst);
    setATipo(o.tipo);
    setAEntry(o.entry);
    setARes(o.res.toString());
    setANota(o.nota);
    setAlfaDia(Number(o.dia.replace("D", "")));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAlfaOp = async (id: any) => {
    if (!confirm("¿Estás seguro de eliminar esta operación?")) return;
    setAlfaOps(prev => prev.filter(o => o.id !== id));
    award(0, "🗑️ Operación eliminada");
    await supabase.from("alfa_ops").delete().eq("id", id);
  };

  const addAlfaVideo = async () => {
    if (!aVideo.trim()) return;
    const n = aVideoDia;
    const v = { dia: n, url: aVideo };

    if (editingVideoId) {
      setAlfaVideos(prev => prev.map(o => o.id === editingVideoId ? { ...o, ...v } : o));
      setEditingVideoId(null);
      setAVideo("");
      await supabase.from("alfa_videos").update(v).eq("id", editingVideoId);
      award(0, "✅ Video actualizado");
    } else {
      const tempId = Date.now();
      setAlfaVideos(prev => [...prev, { ...v, id: tempId }]);
      setAVideo(""); setAVideoDia(n + 1);
      const { data } = await supabase.from("alfa_videos").insert([v]).select();
      if (data && data[0]) {
        setAlfaVideos(prev => prev.map(o => o.id === tempId ? data[0] : o));
      }
      award(0, "✅ Video publicado");
    }
    if (n >= Math.max(0, ...alfaVideos.map(x=>x.dia), n)) setAlfaVideoUrl(aVideo);
    setTimeout(()=>setToast(null),2500);
  };

  const editVideo = (v: any) => {
    setEditingVideoId(v.id);
    setAVideo(v.url);
    setAVideoDia(v.dia);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAlfaVideo = async (id: any) => {
    if (!confirm("¿Estás seguro de eliminar este video?")) return;
    setAlfaVideos(prev => prev.filter(o => o.id !== id));
    award(0, "🗑️ Video eliminado");
    await supabase.from("alfa_videos").delete().eq("id", id);
  };

  const addUserOp = () => {
    if (!uRes) return;
    const n = userOps.length+1;
    const emoji = Number(uRes)>0?"✅":Number(uRes)<0?"🛑":"⚠️";
    setUserOps(prev=>[...prev,{ id:n,dia:`D${n}`,inst:uInst||"SPX",tipo:uTipo||"-",entry:uEntry||"-",res:Number(uRes),nota:uNota,e:emoji }]);
    setUInst(""); setUTipo(""); setUEntry(""); setURes(""); setUNota(""); setMostrarFormUser(false);
    award(50, "+50 GENY Coins por registrar tu operación");
  };

  const tabs = [
    { id:"dash",label:"Inicio",Icon:Home },
    { id:"bit",label:"Bitácora del reto",Icon:BarChart2 },
    { id:"clases",label:"Retos",Icon:BookOpen },
    { id:"com",label:"Comunidad",Icon:Users },
  ];

  // ─── PANTALLA INTRO ────────────────────────────────
  if (screen === "intro") return (
    <div style={{ background:`linear-gradient(135deg,${BG},#0a1628)`,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:FONT,padding:20 }}>
      <div className="landing-container">
        <div className="landing-text">
          <div style={{ marginBottom:20, textAlign: "center" }}>
            <div style={{ marginBottom:14, display: "flex", justifyContent: "center" }}>
              <img src="/logo-app.png" alt="Reto 2K a 20K Ingresarios" style={{ height: 270, maxWidth: "100%", objectFit: "contain" }} />
            </div>
            <p style={{ color:MUTED,fontSize:15,margin:0 }}>Mira el mensaje del Comando ALFA antes de unirte</p>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20 }}>
            {[["📅","7 Días","en vivo"],["📊","Bitácora","operación x op."],["🧠","Flow+Sombra","mini clases"]].map(([ico,v,l])=>(
              <div key={l as string} style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:"12px 8px",textAlign:"center" }}>
                <div style={{ fontSize:20,marginBottom:3 }}>{ico as string}</div>
                <div style={{ color:"#fff",fontWeight:700,fontSize:12 }}>{v as string}</div>
                <div style={{ color:MUTED,fontSize:11 }}>{l as string}</div>
              </div>
            ))}
          </div>

          <button onClick={()=>setScreen("reg")}
            style={{ width:"100%",background:"linear-gradient(135deg,#00ff88,#00cc6a)",border:"none",borderRadius:12,padding:"16px",color:BG,fontWeight:800,fontSize:16,cursor:"pointer" }}>
            🚀 QUIERO UNIRME AL COMANDO ALFA — ES GRATIS
          </button>
        </div>

        {/* Lado Video */}
        <div className="landing-media">
          <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,overflow:"hidden" }}>
            <YTEmbed url={introVideoUrl} style={{ width:"100%",aspectRatio:"16/9" }} />
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PANTALLA REGISTRO ──────────────────────────────
  if (screen === "reg") return (
    <div style={{ background:`linear-gradient(135deg,${BG},#0a1628)`,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONT,padding:20 }}>
      <div className="reg-container">
        <button onClick={()=>setScreen("intro")} style={{ background:"none",border:"none",color:MUTED,cursor:"pointer",fontSize:13,marginBottom:16,padding:0 }}>← Volver</button>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img src="/logo-app.png" alt="Reto 2K a 20K" style={{ height: 120, objectFit: "contain" }} />
        </div>
        <h2 style={{ color:"#fff",margin:"0 0 6px",fontSize:22,fontWeight:800 }}>Accede Gratis al Reto</h2>
        <p style={{ color:MUTED,fontSize:13,margin:"0 0 20px" }}>Únete al Comando ALFA — 7 días de trading en vivo</p>
        
        <div style={{ marginBottom: 12 }}>
          {inp("Tu nombre completo *",nombre,setNombre,"text","👤")}
          {regErrors.nombre && <div style={{ color:"#ff4455",fontSize:10,marginTop:-8,marginBottom:8,marginLeft:4 }}>Este campo es obligatorio</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          {inp("Tu email *",email,setEmail,"email","📧")}
          {regErrors.email && <div style={{ color:"#ff4455",fontSize:10,marginTop:-8,marginBottom:8,marginLeft:4 }}>Introduce un email válido</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          {inp("WhatsApp *",wa,setWa,"tel",country.flag)}
          {regErrors.wa && <div style={{ color:"#ff4455",fontSize:10,marginTop:-8,marginBottom:8,marginLeft:4 }}>Número de contacto obligatorio</div>}
        </div>

        
        <button onClick={()=>{ 
          const errs: any = {};
          if(!nombre) errs.nombre = true;
          if(!email || !email.includes("@")) errs.email = true;
          if(!wa || wa.length < 5) errs.wa = true;
          
          if(Object.keys(errs).length > 0) {
            setRegErrors(errs);
            setToast("⚠️ Por favor completa los campos obligatorios");
            setTimeout(()=>setToast(null),3000);
            return;
          }
          
          setRegErrors({});
          sendToGHL("registro"); 
          setScreen("app"); 
        }}
          style={{ width:"100%",background:"linear-gradient(135deg,#00ff88,#00cc6a)",border:"none",borderRadius:10,padding:"15px",color:BG,fontWeight:800,fontSize:15,cursor:"pointer",marginTop:6 }}>
          🎯 UNIRME AL COMANDO ALFA
        </button>
        <p style={{ color:MUTED,fontSize:11,textAlign:"center",margin:"10px 0 0" }}>Sin spam. Solo actualizaciones del reto.</p>
      </div>
    </div>
  );

  // ─── ADMIN ──────────────────────────────────────────
  if (screen === "admin") return (
    <div style={{ background:BG,minHeight:"100vh",fontFamily:FONT,color:"#fff",padding:20 }}>
      <button onClick={()=>setScreen("app")} style={{ background:"none",border:"none",color:MUTED,cursor:"pointer",fontSize:13,marginBottom:20,padding:0 }}>← Volver a la App</button>

      {!adminMode ? (
        <div style={{ maxWidth:380,margin:"0 auto",paddingTop:40 }}>
          <div style={{ textAlign:"center",marginBottom:24 }}>
            <div style={{ fontSize:32,marginBottom:8 }}>🛡️</div>
            <h2 style={{ margin:"0 0 4px",fontSize:20 }}>Módulo Admin</h2>
            <p style={{ color:MUTED,fontSize:13,margin:0 }}>Acceso restringido — Comando ALFA</p>
          </div>
          {inp("Contraseña de administrador",adminPass,setAdminPass,"password","🔒")}
          {adminError&&<div style={{ color:"#ff4455",fontSize:12,marginBottom:8 }}>Contraseña incorrecta</div>}
          <button onClick={()=>{ if(adminPass===ADMIN_PASS){setAdminMode(true);setAdminError(false);}else setAdminError(true); }}
            style={{ width:"100%",background:"linear-gradient(135deg,#00ff88,#00cc6a)",border:"none",borderRadius:10,padding:"14px",color:BG,fontWeight:800,fontSize:14,cursor:"pointer" }}>
            Ingresar al Panel Admin
          </button>
        </div>
      ) : (
        <div style={{ maxWidth:660,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:24 }}>
            <div style={{ fontSize:24 }}>🛡️</div>
            <div><div style={{ fontWeight:800,fontSize:18 }}>Panel Admin — Comando ALFA</div><div style={{ color:MUTED,fontSize:12 }}>Día actual: {alfaDia} de 7</div></div>
          </div>

          {/* Menu de Tabs Admin */}
          <div style={{ display:"flex", gap:10, marginBottom:20, overflowX:"auto", paddingBottom:8, WebkitOverflowScrolling:"touch" }}>
            {[
              { id:"video-dia", label:"📹 Video del Día" },
              { id:"bitacora", label:"📋 Bitácora" },
              { id:"users", label:"👥 Usuarios Registrados" },
              { id:"intro", label:"🎬 Video Intro" }
            ].map(t => (
               <button key={t.id} onClick={()=>setAdminTab(t.id)}
                 style={{ 
                   background: adminTab===t.id ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.05)",
                   border: `1px solid ${adminTab===t.id ? GREEN : "rgba(255,255,255,0.1)"}`,
                   color: adminTab===t.id ? GREEN : MUTED,
                   borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                   whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0
                 }}>
                 {t.label}
               </button>
            ))}
          </div>

          {/* TAB: Intro */}
          {adminTab === "intro" && (
            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:18,marginBottom:16 }}>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:12,color:"#4db8ff" }}>🎬 Video de Presentación (Intro)</div>
              {inp("URL del video de YouTube intro",aIntroVideo,setAIntroVideo,"url","🔗",true)}
              <button onClick={async ()=>{ 
                if(aIntroVideo.trim()){ 
                  setIntroVideoUrl(aIntroVideo); setAIntroVideo(""); 
                  await supabase.from("app_config").upsert({ key: "intro_video_url", value: aIntroVideo });
                  setToast("✅ Video intro actualizado"); setTimeout(()=>setToast(null),2500); 
                }}}
                style={{ background:"#4db8ff",border:"none",borderRadius:8,padding:"9px 18px",color:BG,fontWeight:700,fontSize:13,cursor:"pointer" }}>
                Actualizar Video Intro
              </button>
            </div>
          )}

          {/* TAB: Video del Día */}
          {adminTab === "video-dia" && (
            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:18,marginBottom:16 }}>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:12,color:GREEN,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                <span>📹 Publicar Video del Día</span>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <span style={{ fontSize:12,color:MUTED,fontWeight:700 }}>Día:</span>
                  <input type="number" value={aVideoDia} onChange={(e)=>setAVideoDia(Number(e.target.value))} style={{ background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:6,padding:"6px 12px",fontSize:14,fontWeight:800,outline:"none",width:70,textAlign:"center" }} />
                </div>
              </div>
              {inp("URL del video de YouTube",aVideo,setAVideo,"url","🔗",true)}
              <button onClick={addAlfaVideo}
                style={{ background:GREEN,border:"none",borderRadius:8,padding:"9px 18px",color:BG,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:16 }}>
                {editingVideoId ? "💾 Guardar Cambios" : "➕ Publicar Video"}
              </button>
              <div style={{ borderTop:`1px solid ${BORDER}`,paddingTop:12 }}>
                <div style={{ fontWeight:700,fontSize:13,marginBottom:8,color:MUTED }}>VIDEOS PUBLICADOS ({alfaVideos.length})</div>
                {[...alfaVideos].reverse().map(v=>(
                  <div key={v.id} style={{ display:"flex",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:13 }}>
                    <span style={{ color:MUTED, width:60, fontWeight:700 }}>Día {v.dia}</span>
                    <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:GREEN }}>{v.url}</span>
                    <button onClick={() => editVideo(v)} style={{ background:"none",border:"none",color:"#4db8ff",cursor:"pointer",marginLeft:12,padding:0,fontSize:14 }} title="Editar video">✏️</button>
                    <button onClick={() => deleteAlfaVideo(v.id)} style={{ background:"none",border:"none",color:"#ff4455",cursor:"pointer",marginLeft:12,padding:0,fontSize:14 }} title="Eliminar video">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Bitácora */}
          {adminTab === "bitacora" && (
            <>
              <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:18,marginBottom:16 }}>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:12,color:"#ffc800",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <span>📋 Agregar Operación a la Bitácora</span>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ fontSize:12,color:MUTED,fontWeight:700 }}>Día:</span>
                    <input type="number" value={alfaDia} onChange={(e)=>setAlfaDia(Number(e.target.value))} style={{ background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:6,padding:"6px 12px",fontSize:14,fontWeight:800,outline:"none",width:70,textAlign:"center" }} />
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8 }}>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Instrumento</div>
                    {inp("ej. SPX 0DTE",aInst,setAInst,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Tipo</div>
                    {inp("ej. Iron Condor",aTipo,setATipo,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Entry</div>
                    {inp("ej. 5820/5830-5870/5880",aEntry,setAEntry,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Resultado P&L ($)</div>
                    {inp("ej. 350 o -120",aRes,setARes,"number",null,true)}
                  </div>
                </div>
                <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Nota de Juan</div>
                <textarea value={aNota} onChange={e=>setANota(e.target.value)} placeholder="Reflexión, contexto del mercado, lección del día..."
                  style={{ width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"10px 12px",color:"#fff",fontSize:12,outline:"none",boxSizing:"border-box",height:70,resize:"none",marginBottom:10 }} />
                <button onClick={addAlfaOp}
                  style={{ background:"linear-gradient(135deg,#ffc800,#ff9900)",border:"none",borderRadius:8,padding:"10px 20px",color:BG,fontWeight:800,fontSize:13,cursor:"pointer" }}>
                  {editingOpId ? "💾 Guardar Cambios" : "➕ Publicar Operación"}
                </button>
              </div>

              <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:18,marginBottom:16 }}>
                <div style={{ fontWeight:700,fontSize:13,marginBottom:12,color:MUTED }}>BITÁCORA PUBLICADA ({alfaOps.length} ops)</div>
                {[...alfaOps].reverse().map(o=>(
                  <div key={o.id} style={{ display:"flex",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:13 }}>
                    <span style={{ color:MUTED, width:40 }}>{o.dia}</span>
                    <span style={{ flex:1 }}>{o.e} {o.inst} — {o.tipo}</span>
                    <span style={{ fontWeight:700,color:o.res>0?GREEN:"#ff4455", width:60, textAlign:"right" }}>{o.res>0?"+":""}{o.res}</span>
                    <button onClick={() => editOp(o)} style={{ background:"none",border:"none",color:"#4db8ff",cursor:"pointer",marginLeft:12,padding:0,fontSize:14 }} title="Editar operación">✏️</button>
                    <button onClick={() => deleteAlfaOp(o.id)} style={{ background:"none",border:"none",color:"#ff4455",cursor:"pointer",marginLeft:12,padding:0,fontSize:14 }} title="Eliminar operación">🗑️</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB: Usuarios */}
          {adminTab === "users" && (
            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:18 }}>
              <div style={{ fontWeight:700,fontSize:13,marginBottom:12,color:MUTED }}>USUARIOS REGISTRADOS ({alfaUsers.length} leads)</div>
              {[...alfaUsers].map((u, i)=>(
                <div key={u.id || i} style={{ display:"flex",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:12 }}>
                  <span style={{ flex:1.5, fontWeight:700, color:"#fff" }}>{u.nombre}</span>
                  <span style={{ flex:2, color:MUTED, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.email}</span>
                  <span style={{ flex:1, color:"#4db8ff", textAlign:"right" }}>{u.telefono}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"rgba(0,255,136,0.95)",color:BG,padding:"10px 20px",borderRadius:99,fontWeight:700,fontSize:13,zIndex:999 }}>{toast}</div>}
    </div>
  );

  // ─── APP PRINCIPAL ──────────────────────────────────
  return (
    <div className="app-layout" style={{ fontFamily:FONT,color:"#fff" }}>
      {toast && <div style={{ position:"fixed",top:66,left:"50%",transform:"translateX(-50%)",background:"rgba(0,255,136,0.95)",color:BG,padding:"9px 18px",borderRadius:99,fontWeight:700,fontSize:12,zIndex:999,whiteSpace:"nowrap" }}>{toast}</div>}

      {/* Sidebar / Bottom Nav */}
      <nav className="main-nav">
        <div className="nav-header-logo" style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <img src="/logo-app.png" alt="Reto 2K a 20K Ingresarios" style={{ height: 96, maxWidth: "100%", objectFit: "contain" }} />
        </div>
        {tabs.map(({id,label,Icon})=>{
          const a=tab===id;
          return (
            <button key={id} onClick={()=>setTab(id)} className="nav-btn" style={{ background:a?"rgba(0,255,136,0.1)":"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"2px 8px" }}>
              <Icon size={18} color={a?GREEN:MUTED} />
              <span className="nav-text" style={{ fontSize:9,color:a?GREEN:MUTED,fontWeight:a?700:400 }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <div style={{ background:"rgba(5,13,26,0.97)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"16px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100 }}>
          <div className="mobile-only-header-title" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }}>
            <img src="/logo-app.png" alt="Reto 2K a 20K" style={{ height: 64, objectFit: "contain" }} />
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center",marginLeft:"auto",position:"relative",zIndex:10 }}>

          <button onClick={()=>setScreen("admin")} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:7,padding:"7px 9px",cursor:"pointer",display:"flex",alignItems:"center" }}>
            <Shield size={14} color={MUTED} />
          </button>
        </div>
      </div>

      <div style={{ padding:"16px 14px 100px", maxWidth:1080, margin:"0 auto", width:"100%", boxSizing:"border-box" }}>

        {/* ── DASHBOARD ── */}
        {tab==="dash" && (
          <div>
            {/* Seguir al Comando ALFA */}
            {!siguiendoAlfa ? (
              <div style={{ background:"linear-gradient(135deg,rgba(0,255,136,0.12),rgba(0,100,255,0.08))",border:"2px solid rgba(0,255,136,0.4)",borderRadius:16,padding:18,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12 }}>
                <div>
                  <div style={{ fontWeight:800,fontSize:15,marginBottom:3 }}>⚔️ Síguenos en el Reto</div>
                  <div style={{ color:MUTED,fontSize:12 }}>Activa las notificaciones y sigue al Comando ALFA operación por operación</div>
                </div>
                <button onClick={()=>{ setSiguiendoAlfa(true); award(100,"+100 GENY Coins — ¡Ya sigues al Comando ALFA!"); }}
                  style={{ background:"linear-gradient(135deg,#00ff88,#00cc6a)",border:"none",borderRadius:10,padding:"11px 16px",color:BG,fontWeight:800,fontSize:13,cursor:"pointer",flexShrink:0 }}>
                  SEGUIR AL<br/>COMANDO ALFA
                </button>
              </div>
            ) : (
              <div style={{ background:"rgba(0,255,136,0.07)",border:"1px solid rgba(0,255,136,0.3)",borderRadius:12,padding:"11px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <span style={{ color:GREEN,fontWeight:700,fontSize:13 }}>Siguiendo al Comando ALFA — recibirás notificaciones de cada operación</span>
              </div>
            )}

            {/* Progress */}
            <div style={{ background:"linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,100,255,0.06))",border:"1px solid rgba(0,255,136,0.2)",borderRadius:16,padding:18,marginBottom:14 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:10,color:MUTED,marginBottom:2 }}>CUENTA COMANDO ALFA</div>
                  <div style={{ fontSize:36,fontWeight:900,color:GREEN,lineHeight:1 }}>${alfaCuenta.toLocaleString()}</div>
                  <div style={{ fontSize:11,color:MUTED,marginTop:2 }}>Meta: $20,000 · Inicio: $2,000</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10,color:MUTED,marginBottom:2 }}>PROGRESO</div>
                  <div style={{ fontSize:30,fontWeight:900,color:GREEN }}>{alfaProgreso.toFixed(1)}%</div>
                  <div style={{ fontSize:12,color:GREEN }}>+${alfaPnL.toLocaleString()} P&L</div>
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.1)",borderRadius:99,height:9,overflow:"hidden" }}>
                <div style={{ background:"linear-gradient(90deg,#00ff88,#00cc6a)",height:"100%",width:`${alfaProgreso}%`,borderRadius:99,boxShadow:"0 0 10px rgba(0,255,136,0.5)" }} />
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:4,fontSize:10,color:MUTED }}>
                <span>$2K</span><span>$20K 🏆</span>
              </div>
            </div>

            {/* Widget: Playlist Video del Día */}
            <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:14, overflow:"hidden", marginBottom:14 }}>
              <div style={{ padding:"12px 14px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:10, color:GREEN, fontWeight:700 }}>📹 VIDEO DEL DÍA {alfaVideos.find(v=>v.url===alfaVideoUrl)?.dia || alfaDia}</div>
                  <div style={{ fontSize:14, fontWeight:700 }}>Historial de Sesiones ALFA</div>
                </div>
                <span style={{ background:"rgba(255,0,0,0.15)", color:"#ff4455", border:"1px solid rgba(255,0,0,0.3)", borderRadius:6, padding:"2px 9px", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", gap:4 }}><div style={{width:6,height:6,borderRadius:"50%",background:"#ff4455",animation:"pulse 2s infinite"}}/> REC</span>
              </div>
              
              <div className="playlist-wrapper">
                {/* Reproductor Principal */}
                <YTEmbed url={alfaVideoUrl} className="playlist-video" />
                
                {/* Lista de Reproducción (Scrollable) */}
                {alfaVideos.length > 0 && (
                  <div className="playlist-list">
                    {[...alfaVideos].reverse().map(v => {
                      const isActive = v.url === alfaVideoUrl;
                      return (
                        <div key={v.id} 
                          onClick={() => setAlfaVideoUrl(v.url)}
                          style={{ 
                            padding: "12px 16px",
                            display: "flex", alignItems: "center", gap: 12,
                            cursor: "pointer",
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                            background: isActive ? "rgba(0,255,136,0.05)" : "transparent",
                            transition: "background 0.2s"
                          }}>
                          <div style={{ 
                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                            background: isActive ? GREEN : "rgba(255,255,255,0.1)",
                            color: isActive ? BG : "#fff",
                            display: "flex", justifyContent: "center", alignItems: "center",
                            fontSize: 12
                          }}>
                            {isActive ? "▶" : "▶"}
                          </div>
                          <div style={{ flex: 1, minWidth: 150 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? GREEN : "#fff" }}>
                              Reto Día {v.dia}
                            </div>
                            <div style={{ fontSize: 11, color: MUTED }}>
                              {isActive ? "Reproduciendo" : "Análisis Día " + v.dia}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Mini equity */}
            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16,marginBottom:14 }}>
              <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:8 }}>📈 CURVA EQUITY — COMANDO ALFA</div>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={alfaEquity}>
                  <defs>
                    <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="dia" tick={{ fill:MUTED,fontSize:9 }} />
                  <YAxis tick={{ fill:MUTED,fontSize:9 }} tickFormatter={(v:number)=>`$${(v/1000).toFixed(1)}K`} />
                  <Tooltip contentStyle={{ background:"#0a1628",border:"1px solid rgba(0,255,136,0.3)",borderRadius:8,fontSize:12 }} formatter={(v:any)=>[`$${Number(v).toLocaleString()}`,"Cuenta"]} />
                  <Area type="monotone" dataKey="valor" stroke={GREEN} strokeWidth={2} fill="url(#grd)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8 }}>
              {[["OPS",alfaOps.length,"total","#fff"],["WIN",`${alfaWR}%`,`${alfaOps.filter(o=>o.res>0).length} gan.`,GREEN],["+P&L",`$${alfaPnL.toLocaleString()}`,"bruto",GREEN],["RACHA",`${streak}d`,"🔥","#ff8c00"]].map(([l,v,s,c])=>(
                <div key={l} style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:10,padding:"11px 8px",textAlign:"center" }}>
                  <div style={{ fontSize:9,color:MUTED,fontWeight:700,marginBottom:2 }}>{l as string}</div>
                  <div style={{ fontSize:18,fontWeight:800,color:c as string }}>{v as React.ReactNode}</div>
                  <div style={{ fontSize:10,color:MUTED }}>{s as string}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BITÁCORA COMANDO ALFA ── */}
        {tab==="bit" && (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <h2 style={{ margin:0,fontSize:18,fontWeight:800 }}>📋 Bitácora del reto</h2>
              <div style={{ background:"rgba(0,255,136,0.1)",border:"1px solid rgba(0,255,136,0.3)",borderRadius:7,padding:"4px 11px" }}>
                <span style={{ color:GREEN,fontWeight:700,fontSize:12 }}>+${alfaPnL.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16,marginBottom:14 }}>
              <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:8 }}>CURVA DE EQUITY</div>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={alfaEquity}>
                  <defs>
                    <linearGradient id="grd2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="dia" tick={{ fill:MUTED,fontSize:9 }} />
                  <YAxis tick={{ fill:MUTED,fontSize:9 }} tickFormatter={(v:number)=>`$${v.toLocaleString()}`} />
                  <Tooltip contentStyle={{ background:"#0a1628",border:"1px solid rgba(0,255,136,0.3)",borderRadius:8,fontSize:12 }} formatter={(v:any)=>[`$${Number(v).toLocaleString()}`,"Cuenta"]} />
                  <ReferenceLine y={2000} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="valor" stroke={GREEN} strokeWidth={2.5} fill="url(#grd2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {[...alfaOps].reverse().map((o: any)=>(
                <div key={o.id} style={{ background:CARD,border:`1px solid ${o.res>0?"rgba(0,255,136,0.2)":"rgba(255,68,85,0.2)"}`,borderRadius:12,padding:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7 }}>
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap" }}>
                        <span style={{ fontSize:14 }}>{o.e}</span>
                        <span style={{ fontWeight:700,fontSize:13 }}>{o.inst}</span>
                        <span style={{ background:"rgba(255,255,255,0.07)",borderRadius:4,padding:"2px 6px",fontSize:10,color:"#7a9db8" }}>{o.tipo}</span>
                        <span style={{ background:"rgba(0,255,136,0.1)",borderRadius:4,padding:"2px 6px",fontSize:10,color:GREEN }}>{o.dia}</span>
                      </div>
                      <div style={{ fontSize:11,color:MUTED }}>Entry: {o.entry}</div>
                    </div>
                    <div style={{ fontSize:20,fontWeight:800,color:o.res>0?GREEN:"#ff4455",flexShrink:0 }}>
                      {o.res>0?"+":""}{o.res}
                    </div>
                  </div>
                  {o.nota&&<div style={{ background:"rgba(255,255,255,0.04)",borderRadius:7,padding:"8px 10px",fontSize:11,color:"#8ab0cc",fontStyle:"italic" }}>💬 "{o.nota}"</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MI RETO (Bitácora Personal) ── */}
        {tab==="mireto" && (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <div>
                <h2 style={{ margin:"0 0 2px",fontSize:18,fontWeight:800 }}>📈 Mi Reto Personal</h2>
                <div style={{ color:MUTED,fontSize:12 }}>Tu bitácora día a día — paralela al Comando ALFA</div>
              </div>
              <div style={{ background:"rgba(0,255,136,0.1)",border:"1px solid rgba(0,255,136,0.3)",borderRadius:7,padding:"4px 11px" }}>
                <span style={{ color:GREEN,fontWeight:700,fontSize:12 }}>${userCuenta.toLocaleString()}</span>
              </div>
            </div>

            {userOps.length>0 && (
              <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16,marginBottom:14 }}>
                <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:8 }}>MI CURVA DE EQUITY</div>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={userEquity}>
                    <defs>
                      <linearGradient id="ugrd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4db8ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4db8ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="dia" tick={{ fill:MUTED,fontSize:9 }} />
                    <YAxis tick={{ fill:MUTED,fontSize:9 }} tickFormatter={(v:number)=>`$${v.toLocaleString()}`} />
                    <Tooltip contentStyle={{ background:"#0a1628",border:"1px solid rgba(77,184,255,0.3)",borderRadius:8,fontSize:12 }} formatter={(v:any)=>[`$${Number(v).toLocaleString()}`,"Mi Cuenta"]} />
                    <ReferenceLine y={2000} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                    <Area type="monotone" dataKey="valor" stroke="#4db8ff" strokeWidth={2.5} fill="url(#ugrd)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <button onClick={()=>setMostrarFormUser(v=>!v)}
              style={{ width:"100%",background:"linear-gradient(135deg,rgba(77,184,255,0.2),rgba(0,100,200,0.2))",border:"1px solid rgba(77,184,255,0.4)",borderRadius:12,padding:"13px",color:"#4db8ff",fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:14 }}>
              {mostrarFormUser?"✕ Cancelar":"➕ Registrar Mi Operación del Día (+50 🪙)"}
            </button>

            {mostrarFormUser && (
              <div style={{ background:CARD,border:`1px solid rgba(77,184,255,0.3)`,borderRadius:14,padding:16,marginBottom:14 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8 }}>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Instrumento</div>
                    {inp("SPX, QQQ...",uInst,setUInst,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Tipo</div>
                    {inp("Iron Condor...",uTipo,setUTipo,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Entry</div>
                    {inp("Strikes / precio",uEntry,setUEntry,"text",null,true)}
                  </div>
                  <div>
                    <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Resultado P&L ($)*</div>
                    {inp("ej. 200 o -80",uRes,setURes,"number",null,true)}
                  </div>
                </div>
                <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>Mi reflexión</div>
                <textarea value={uNota} onChange={e=>setUNota(e.target.value)} placeholder="¿Qué aprendí hoy? ¿Cómo estuvo mi estado mental?"
                  style={{ width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"9px 11px",color:"#fff",fontSize:12,outline:"none",boxSizing:"border-box",height:60,resize:"none",marginBottom:10 }} />
                <button onClick={addUserOp}
                  style={{ background:"#4db8ff",border:"none",borderRadius:8,padding:"10px 20px",color:BG,fontWeight:800,fontSize:13,cursor:"pointer" }}>
                  Guardar Operación
                </button>
              </div>
            )}

            {userOps.length===0 ? (
              <div style={{ background:CARD,border:`1px dashed rgba(255,255,255,0.1)`,borderRadius:14,padding:30,textAlign:"center" }}>
                <div style={{ fontSize:32,marginBottom:8 }}>📋</div>
                <div style={{ color:MUTED,fontSize:13 }}>Aún no tienes operaciones registradas.<br/>Empieza a documentar tu reto.</div>
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {[...userOps].reverse().map((o:any)=>(
                  <div key={o.id} style={{ background:CARD,border:`1px solid ${o.res>0?"rgba(77,184,255,0.25)":"rgba(255,68,85,0.2)"}`,borderRadius:12,padding:14 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6 }}>
                      <div>
                        <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap" }}>
                          <span style={{ fontSize:14 }}>{o.e}</span>
                          <span style={{ fontWeight:700,fontSize:13 }}>{o.inst}</span>
                          <span style={{ background:"rgba(77,184,255,0.1)",borderRadius:4,padding:"2px 6px",fontSize:10,color:"#4db8ff" }}>{o.dia}</span>
                        </div>
                        <div style={{ fontSize:11,color:MUTED }}>{o.tipo} · {o.entry}</div>
                      </div>
                      <div style={{ fontSize:20,fontWeight:800,color:o.res>0?"#4db8ff":"#ff4455",flexShrink:0 }}>
                        {o.res>0?"+":""}{o.res}
                      </div>
                    </div>
                    {o.nota&&<div style={{ background:"rgba(255,255,255,0.04)",borderRadius:7,padding:"7px 10px",fontSize:11,color:"#8ab0cc",fontStyle:"italic" }}>💬 "{o.nota}"</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CLASES ── */}
        {tab==="clases" && (
          <div>
            <h2 style={{ margin:"0 0 4px",fontSize:18,fontWeight:800 }}>🧠 Retos</h2>
            <p style={{ color:MUTED,fontSize:12,margin:"0 0 16px" }}>Se desbloquean día a día. Conocimiento que transforma traders.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
              {initClases.map(c=>{
                const catColor=c.cat==="Flow"?"#4db8ff":c.cat==="Sombra"?"#c084fc":GREEN;
                const catBg=c.cat==="Flow"?"rgba(0,150,255,0.15)":c.cat==="Sombra"?"rgba(150,0,255,0.15)":"rgba(0,255,136,0.1)";
                const ico=c.cat==="Flow"?"⚡":c.cat==="Sombra"?"🔮":"📋";
                return (
                  <div key={c.id} style={{ background:c.open?CARD:"rgba(255,255,255,0.02)",border:`1px solid ${c.done?"rgba(0,255,136,0.3)":c.open?BORDER:"rgba(255,255,255,0.05)"}`,borderRadius:13,padding:14,opacity:c.open?1:0.5 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div style={{ display:"flex",gap:11,alignItems:"center",flex:1 }}>
                        <div style={{ width:40,height:40,background:catBg,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{ico}</div>
                        <div>
                          <div style={{ display:"flex",gap:6,alignItems:"center",marginBottom:2,flexWrap:"wrap" }}>
                            <span style={{ fontSize:13,fontWeight:700 }}>{c.t}</span>
                            <span style={{ background:catBg,color:catColor,borderRadius:4,padding:"1px 6px",fontSize:9,fontWeight:700 }}>{c.cat}</span>
                          </div>
                          <div style={{ fontSize:11,color:MUTED,marginBottom:4 }}>{c.sub}</div>
                          <div style={{ display:"flex",gap:10,fontSize:10,color:MUTED }}>
                            <span>⏱ {c.dur}</span><span style={{ color:"#ffc800" }}>+{c.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ flexShrink:0,marginLeft:8 }}>
                        {c.done?<div style={{ width:32,height:32,background:"rgba(0,255,136,0.2)",border:"2px solid "+GREEN,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:GREEN,fontWeight:700,fontSize:14 }}>✓</div>
                          :c.open?<div style={{ width:32,height:32,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>▶</div>
                          :<div style={{ width:32,height:32,background:"rgba(255,255,255,0.05)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:MUTED }}>🔒</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── COMUNIDAD ── */}
        {tab==="com" && (
          <div>
            <h2 style={{ margin:"0 0 14px",fontSize:18,fontWeight:800 }}>🏆 Leaderboard + Comunidad</h2>
            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16,marginBottom:14 }}>
              <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:10 }}>TOP PARTICIPANTES — Día {alfaDia}</div>
              {lboard.map(p=>(
                <div key={p.pos} style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 6px",borderBottom:"1px solid rgba(255,255,255,0.05)",background:p.yo?"rgba(0,255,136,0.04)":"transparent",borderRadius:p.yo?7:0 }}>
                  <div style={{ width:26,height:26,background:p.pos<=3?["rgba(255,215,0,0.2)","rgba(192,192,192,0.2)","rgba(205,127,50,0.2)"][p.pos-1]:"rgba(255,255,255,0.06)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:p.pos<=3?["#ffd700","#c0c0c0","#cd7f32"][p.pos-1]:MUTED,flexShrink:0 }}>
                    {p.pos<=3?["🥇","🥈","🥉"][p.pos-1]:p.pos}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:p.yo?800:600,fontSize:13,color:p.yo?GREEN:"#fff" }}>{p.n} {p.pais}</div>
                    <div style={{ fontSize:10,color:MUTED }}>🔥 {p.streak} días</div>
                  </div>
                  <div style={{ fontWeight:700,color:"#ffc800",fontSize:12 }}>🪙 {p.coins.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16 }}>
              <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:10 }}>💬 FEED DE LA COMUNIDAD</div>
              <div style={{ display:"flex",gap:7,marginBottom:12 }}>
                <input value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="Tu reflexión del día... (+25 🪙)"
                  style={{ flex:1,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"9px 11px",color:"#fff",fontSize:12,outline:"none" }} />
                <button onClick={()=>{ if(comentario.trim()){ setFeed(f=>[{u:`${nombre||"Tú"} 🇨🇴`,t:comentario,time:"ahora",likes:0},...f]); setComentario(""); award(25,"+25 GENY Coins por participar"); }}}
                  style={{ background:GREEN,border:"none",borderRadius:8,padding:"9px 13px",color:BG,fontWeight:800,cursor:"pointer",fontSize:14 }}>→</button>
              </div>
              {feed.map((c,i)=>(
                <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.05)",paddingBottom:10,marginBottom:10 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
                    <span style={{ fontWeight:700,fontSize:12,color:GREEN }}>{c.u}</span>
                    <span style={{ fontSize:10,color:MUTED }}>{c.time}</span>
                  </div>
                  <p style={{ color:"#c0d4e4",fontSize:12,margin:0,lineHeight:1.5 }}>{c.t}</p>
                  {c.likes>0&&<div style={{ marginTop:3,fontSize:10,color:"#ffc800" }}>🪙 {c.likes} reacciones</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PERFIL ── */}
        {tab==="perfil" && (
          <div>
            <div style={{ background:"linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,100,255,0.1))",border:"1px solid rgba(0,255,136,0.2)",borderRadius:14,padding:20,marginBottom:14,textAlign:"center" }}>
              <div style={{ width:62,height:62,background:"linear-gradient(135deg,#00ff88,#00cc6a)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",fontSize:26,fontWeight:900,color:BG }}>
                {(nombre||"T").charAt(0).toUpperCase()}
              </div>
              <div style={{ fontSize:18,fontWeight:800,marginBottom:2 }}>{nombre||"Trader"}</div>
              <div style={{ fontSize:11,color:MUTED,marginBottom:12 }}>Comando ALFA · Reto 2K→20K · Día {alfaDia}</div>
              <div style={{ display:"flex",justifyContent:"center",gap:24 }}>
                {[["🪙",coins.toLocaleString(),"GENY Coins"],["⚡",(coins*2).toLocaleString(),"XP Total"],["🔥",streak,"Racha"]].map(([ico,v,l])=>(
                  <div key={l}><div style={{ fontSize:18 }}>{ico}</div><div style={{ fontSize:15,fontWeight:800 }}>{v}</div><div style={{ fontSize:9,color:MUTED }}>{l}</div></div>
                ))}
              </div>
            </div>

            <div style={{ background:CARD,border:`1px solid ${BORDER}`,borderRadius:14,padding:16,marginBottom:12 }}>
              <div style={{ fontSize:11,color:MUTED,fontWeight:600,marginBottom:12 }}>🎖️ MIS BADGES</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9 }}>
                {badges.map(b=>(
                  <div key={b.id} style={{ background:b.ok?"rgba(0,255,136,0.07)":"rgba(255,255,255,0.02)",border:`1px solid ${b.ok?"rgba(0,255,136,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:11,padding:12,opacity:b.ok?1:0.5 }}>
                    <div style={{ fontSize:20,marginBottom:4 }}>{b.ok?b.ico:"🔒"}</div>
                    <div style={{ fontSize:11,fontWeight:700,color:b.ok?"#fff":MUTED,marginBottom:2 }}>{b.n}</div>
                    <div style={{ fontSize:10,color:MUTED }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={()=>setShare(s=>!s)}
              style={{ width:"100%",background:"linear-gradient(135deg,#00ff88,#00cc6a)",border:"none",borderRadius:11,padding:"14px",color:BG,fontWeight:800,fontSize:13,cursor:"pointer" }}>
              📤 Compartir Mi Progreso en Redes
            </button>

            {share && (
              <div style={{ marginTop:10,background:"rgba(0,255,136,0.07)",border:"1px solid rgba(0,255,136,0.3)",borderRadius:12,padding:14 }}>
                <div style={{ background:"linear-gradient(135deg,#050d1a,#0a1628)",border:"2px solid "+GREEN,borderRadius:12,padding:16,textAlign:"center" }}>
                  <div style={{ fontSize:9,color:GREEN,letterSpacing:2,marginBottom:2 }}>INGRESARIOS · COMANDO ALFA</div>
                  <div style={{ fontSize:22,fontWeight:900,marginBottom:2 }}>Día {alfaDia} de 7</div>
                  <div style={{ fontSize:22,color:GREEN,fontWeight:800 }}>${alfaCuenta.toLocaleString()}</div>
                  <div style={{ fontSize:12,color:MUTED,marginBottom:6 }}>{alfaProgreso.toFixed(1)}% del camino a $20K</div>
                  <div style={{ fontSize:11,color:"#7a9db8" }}>🔥 {streak} días · 🪙 {coins.toLocaleString()} coins</div>
                </div>
                <div style={{ fontSize:11,color:MUTED,textAlign:"center",marginTop:8 }}>Copia y pega en Instagram · WhatsApp · TikTok</div>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
