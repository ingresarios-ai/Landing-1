import { motion } from 'framer-motion';

export const BackgroundGrid = () => {
  // Generar un camino ascendente (bullish) para la línea de tendencia
  const pathData = "M 0 900 Q 150 850 300 880 T 600 780 T 900 820 T 1200 600 T 1500 650 T 1800 450 T 2100 500 T 2400 300 T 2700 350 T 3000 150";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0B0C]">
      {/* Atmósfera: Dos orbes de gradiente grandes y muy difuminados en las esquinas */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-3xl opacity-5 bg-[#7DA04D]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-3xl opacity-5 bg-[#F5A623]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Patrón de Rejilla: Cuadrícula técnica sutil de 60x60px con líneas blancas transparentes al 3% */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Elementos de Trading (SVG) */}
      <svg 
        viewBox="0 0 3000 1000" 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#7DA04D" />
            <stop offset="100%" stopColor="#7DA04D" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Barras de Volumen: En la parte inferior, diferentes alturas que pulsen suavemente */}
        {[...Array(60)].map((_, i) => {
          const height = 15 + Math.random() * 120;
          const isGreen = Math.random() > 0.4;
          return (
            <motion.rect
              key={`vol-${i}`}
              x={i * 50 + 10}
              y={1000}
              width="20"
              height={height}
              fill={isGreen ? "#7DA04D" : "#ef4444"}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ 
                opacity: [0.03, 0.12, 0.03],
                scaleY: [1, 1.1, 1],
                y: 1000 - height,
              }}
              transition={{ 
                duration: 3 + Math.random() * 3, 
                repeat: Infinity,
                delay: i * 0.05
              }}
              className="origin-bottom"
            />
          );
        })}

        {/* Velas Japonesas (Candlesticks): Distribuidos con alternancia y animaciones de escala */}
        {[...Array(40)].map((_, i) => {
          const isGreen = Math.random() > 0.45;
          const color = isGreen ? "#7DA04D" : "#ef4444";
          const h = 20 + Math.random() * 80; // Body height
          const startX = 50 + i * 75;
          const startY = 800 - i * 18 + (Math.random() * 200 - 100);
          
          return (
            <g key={`candle-${i}`}>
              {/* Mecha (Wick) */}
              <motion.line
                x1={startX + 4}
                y1={startY - h/2 - 15 - Math.random() * 10}
                x2={startX + 4}
                y2={startY + h/2 + 15 + Math.random() * 10}
                stroke={color}
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
              />
              {/* Cuerpo (Body) */}
              <motion.rect
                x={startX}
                y={startY - h/2}
                width="8"
                height={h}
                fill={color}
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ 
                  opacity: [0.15, 0.35, 0.15],
                  scaleY: [0.9, 1.1, 0.9],
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                className="origin-center"
              />
            </g>
          );
        })}

        {/* Línea de Tendencia: Camino ascendente (bullish) animado */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#trendGradient)"
          strokeWidth="3.5"
          filter="url(#glowEffect)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
          }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />

        {/* Indicador Móvil: Un pequeño punto brillante que recorre la línea de tendencia */}
        <motion.circle
          cx={0}
          cy={0}
          r={7}
          fill="#7DA04D"
          filter="url(#glowEffect)"
          initial={{ opacity: 0, x: 0, y: 900 }}
          animate={{
            x: [0, 3000],
            y: [900, 150], // Aproximación lineal simplificada del recorrido
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5
          }}
        />
      </svg>

      {/* Máscara radial para oscurecer hacia los bordes y crear efecto de enfoque central */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at center, rgba(11,11,12,0) 0%, rgba(11,11,12,1) 90%)" }}
      />

      {/* Detalles Finales: Overlay de texto con precio ficticio parpadeando suavemente */}
      <div className="absolute top-[25%] right-[8%] flex flex-col items-end gap-1 opacity-40 pointer-events-none">
        <div className="text-[10px] sm:text-xs font-mono text-[#7DA04D] uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7DA04D] animate-pulse" />
          Live Feed
        </div>
        <motion.div 
          className="text-2xl sm:text-4xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(125,160,77,0.3)]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          $24,892.41
        </motion.div>
        <motion.div 
          className="text-xs font-mono text-[#7DA04D] font-bold"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          +4.28%
        </motion.div>
      </div>

    </div>
  );
};
