import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Send, ShieldCheck, Zap, PlayCircle, AlertTriangle, Eye, MousePointer2 } from 'lucide-react';
import { BackgroundGrid } from './components/v3/BackgroundGrid';
import { RegistrationFormV3 } from './components/v3/RegistrationFormV3';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-04-20T19:00:00-05:00').getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 font-mono text-brand-base font-bold">
      <div className="flex flex-col items-center bg-brand-base/15 px-2 py-1 rounded">
        <span className="text-lg md:text-xl leading-none">{timeLeft.days}d</span>
      </div>
      <div className="flex flex-col items-center bg-brand-base/15 px-2 py-1 rounded">
        <span className="text-lg md:text-xl leading-none">{timeLeft.hours}h</span>
      </div>
      <div className="flex flex-col items-center bg-brand-base/15 px-2 py-1 rounded">
        <span className="text-lg md:text-xl leading-none">{timeLeft.minutes}m</span>
      </div>
      <div className="flex flex-col items-center bg-brand-base/15 px-2 py-1 rounded">
        <span className="text-lg md:text-xl leading-none animate-pulse">{timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

export const LandingV3 = () => {
  return (
    <div className="relative min-h-screen selection:bg-brand-blue/30 selection:text-brand-blue">
      <BackgroundGrid />

      {/* Header de Evento (Cintillo Superior) */}
      <div className="bg-brand-green text-brand-base py-3 px-6 sticky top-0 z-[100] overflow-hidden shadow-lg border-b border-brand-base/10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 font-black text-xs md:text-sm uppercase tracking-tighter">
            <span className="bg-brand-base text-brand-green px-2 py-1 rounded">EVENTO EN VIVO</span>
            20 ABR - 03 MAY | 7:00 PM (COL)
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Inicia en:</span>
            <Countdown />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-6 pt-8 pb-6 flex justify-center md:justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <img 
            src="/logo-app.png" 
            alt="Reto 2k a 20k Logo" 
            className="h-36 w-auto" 
          />
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em]">
          <span>Reality de Trading en Vivo</span>
          <div className="w-1 h-1 bg-brand-green rounded-full" />
          <span className="text-brand-green">Estudio de Caso Real</span>
        </div>
      </nav>

      <main id="registro" className="container mx-auto px-6 md:pt-4 pb-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Desktop) / Main Flow (Mobile) */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            {/* Headline de Acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight mb-4 lg:mb-8 uppercase">
                Lo que los <span className="crayon-underline">"gurús de trading"</span> no se atreven a mostrar en vivo.
              </h1>
              <p className="text-base md:text-xl text-brand-text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Del 20 de abril al 3 de mayo,{" "}
                <span className="text-brand-green font-bold uppercase transition-colors">
                  abriremos una cuenta real
                </span>{" "}
                para llevarla de{" "}
                <span className="text-white font-bold uppercase transition-colors">
                  2k a 20k
                </span>
                . Sin filtros ni ediciones: observa la{" "}
                <span className="text-white font-bold uppercase transition-colors">
                  ejecución profesional
                </span>{" "}
                frente a tus ojos.
              </p>
            </motion.div>

            {/* Mobile-only Form: Visible only on mobile, placed after headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:hidden w-full"
            >
              <RegistrationFormV3 />
            </motion.div>

            {/* Sección "Por qué inscribirte" */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green mx-auto lg:mx-0">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-center lg:text-left">BITÁCORA ABIERTA</h4>
                <p className="text-xs text-brand-text-muted leading-relaxed text-center lg:text-left">Sigue cada operación en tiempo real. Sin ediciones ni filtros: observa la anatomía de una cuenta real en su camino de 2.000 a 20.000.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green mx-auto lg:mx-0">
                  <MousePointer2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-center lg:text-left">DASHBOARD ACTIVO</h4>
                <p className="text-xs text-brand-text-muted leading-relaxed text-center lg:text-left">Toma el control con herramientas exclusivas. Al registrarte, desbloqueas el panel para medir tu progreso diario.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange mx-auto lg:mx-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-center lg:text-left text-brand-orange">CRITERIO PROFESIONAL</h4>
                <p className="text-xs text-brand-text-muted leading-relaxed text-center lg:text-left">Desarrolla el blindaje necesario para operar en 2026. Aprende a identificar el valor real del mercado y a filtrar las estafas que detienen tu crecimiento.</p>
              </motion.div>
            </div>
          </div>

          {/* Right Column (Desktop): Visible only on large screens */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5 sticky top-24"
          >
            <RegistrationFormV3 />
          </motion.div>
        </div>
      </main>

      {/* Nueva Sección: ¿Qué es el Reto? */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-base/50">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none">
                ¿Qué es el <br />
                <span className="text-brand-green">Reto 2k a 20k</span>?
              </h2>
              <div className="w-20 h-1.5 bg-brand-green mb-8 mx-auto lg:mx-0 rounded-full" />
              <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                Un Reality de Trading como nunca lo habías visto, con <span className="text-brand-green">RESULTADOS EN VIVO</span>.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="glass-card p-8 md:p-10 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-brand-green/30">
                  <PlayCircle className="text-brand-green w-6 h-6" />
                </div>
                <p className="text-lg text-brand-text-muted leading-relaxed font-medium">
                  Del 20 de abril al 3 de mayo, a las 7:00 PM (Colombia), abriremos las puertas de nuestra operativa privada. No es una clase teórica; es la ejecución técnica en vivo de una cuenta real para llevarla de 2.000 a 20.000. Serás testigo de cada decisión, cada entrada y cada gestión de riesgo en tiempo real.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nueva Sección: El Mentor */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Espacio para la imagen del autor */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative group"
            >
              <div className="absolute -inset-4 bg-brand-green/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                {/* Placeholder para la imagen del autor */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <span className="text-sm font-mono uppercase tracking-widest">Imagen de Juan Fernando Villegas</span>
                </div>
                <img 
                  src="https://picsum.photos/seed/mentor/800/1000" 
                  alt="Juan Fernando Villegas" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-transparent to-transparent opacity-60" />
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-3/5 space-y-8"
            >
              <div>
                <h3 className="text-brand-green font-bold uppercase tracking-[0.2em] text-sm mb-4">El Mentor detrás del Reto</h3>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                  Juan Fernando <br />
                  <span className="text-white/90">Villegas</span>
                </h2>
                <div className="w-16 h-1 bg-brand-green rounded-full" />
              </div>

              <blockquote className="border-l-4 border-brand-green pl-6 py-2">
                <p className="text-xl md:text-2xl font-bold italic text-white/90 leading-tight">
                  "No operamos por suerte; operamos con un sistema, tecnología y, sobre todo, criterio profesional."
                </p>
              </blockquote>

              <div className="space-y-6 text-brand-text-muted text-lg leading-relaxed">
                <p>
                  Juan Fernando Villegas es la mente detrás del Método Ingresarios y uno de los referentes más respetados en la profesionalización del trading en Latinoamérica. Con más de 20 años de experiencia enfrentando la volatilidad de los mercados globales, ha consolidado una carrera basada en la transparencia y la disciplina técnica.
                </p>
                <p>
                  Su mayor legado no es solo su operativa personal, sino el impacto en la comunidad: ha formado y acompañado a miles de traders en su camino desde la confusión inicial hasta la maestría y el éxito financiero. Juan Fernando es conocido por ser un "anti-gurú"; su enfoque no está en las ganancias mágicas, sino en desarrollar el Flow de Inversionista, un estado donde la tecnología y el criterio humano trabajan en perfecta sincronía para generar Tranquilidad Financiera.
                </p>
                <p className="font-medium text-white/80">
                  En este Reto 2k a 20k, Juan Fernando abre por primera vez su bitácora técnica de forma integral, permitiéndote ser testigo de la ejecución profesional que ha enseñado a miles de personas durante las últimas dos décadas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nueva Sección: CTA Final */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 bg-brand-green/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                ¿Estás listo para ver la <br />
                <span className="text-brand-green">realidad del mercado</span>?
              </h2>
              <p className="text-lg md:text-xl text-brand-text-muted leading-relaxed max-w-2xl mx-auto font-medium">
                Únete a 14 días de trading en vivo y descubre cómo se gestiona una cuenta real con método y tecnología aplicada. El registro es totalmente gratuito, pero el acceso a la plataforma es limitado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                onClick={() => document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center px-10 py-6 bg-[#7DA04D] text-black font-extrabold text-xl md:text-2xl uppercase tracking-tighter rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(125,160,77,0.4)] active:scale-95"
              >
                <span className="relative flex items-center gap-4">
                  RESERVAR MI CUPO GRATIS
                  <Send className="w-7 h-7 stroke-[3px] -rotate-12 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] opacity-60">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-base bg-brand-base flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span>+1,240 Inscritos esta semana</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Elementos decorativos de fondo para la sección CTA */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-green/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full -z-10" />
      </section>

      {/* Footer de Compliance (Blindaje Meta/Google) */}
      <footer className="border-t border-white/5 bg-brand-base/80 backdrop-blur-xl py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all">
              <TrendingUp className="w-8 h-8" />
              <Zap className="w-8 h-8" />
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div className="space-y-4">
              <p className="text-[11px] text-brand-text-muted leading-relaxed font-medium uppercase tracking-widest">
                Nota Obligatoria: El trading de activos financieros implica un riesgo real de pérdida. Los resultados mostrados son educativos y no garantizan ganancias futuras. Operativa real sujeta a riesgo de mercado.
              </p>
              <p className="text-[9px] text-brand-text-muted/60 leading-relaxed uppercase tracking-[0.15em]">
                Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc. Google es una marca comercial de Google, LLC.
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-brand-text-muted/40 font-bold uppercase tracking-widest">© 2026 INGRESARIOS • MÉTODO ESTRUCTURADO</p>
              <div className="flex gap-6 text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                <a href="#" className="hover:text-brand-green transition-colors">Políticas de Privacidad</a>
                <a href="#" className="hover:text-brand-green transition-colors">Términos de Uso</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
