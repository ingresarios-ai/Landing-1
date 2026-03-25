import { motion } from 'framer-motion';

export const BackgroundGrid = () => {
  // Generate a random-looking but generally upward path for the trading line
  const pathData = "M 0 800 Q 100 750 200 780 T 400 700 T 600 720 T 800 600 T 1000 650 T 1200 500 T 1400 550 T 1600 400 T 1800 450 T 2000 300";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-brand-base">
      {/* Animated Gradient Orbs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-green/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />
      
      {/* Animated Trading Line */}
      <svg 
        viewBox="0 0 2000 1000" 
        className="absolute inset-0 w-full h-full opacity-40 preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#7DA04D" />
            <stop offset="100%" stopColor="#7DA04D" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Volume Bars at the bottom */}
        {[...Array(40)].map((_, i) => (
          <motion.rect
            key={`vol-${i}`}
            x={i * 50}
            y={1000}
            width="15"
            height={20 + Math.random() * 100}
            fill={Math.random() > 0.3 ? "#7DA04D" : "#ef4444"}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0.05, 0.15, 0.05],
              scaleY: [1, 1.2, 1],
              y: 1000 - (20 + Math.random() * 100),
              transition: { 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: i * 0.1
              }
            }}
            className="origin-bottom"
          />
        ))}

        {/* Secondary faint lines for depth */}
        <motion.path
          d="M 0 850 Q 200 800 400 820 T 800 750 T 1200 780 T 1600 650 T 2000 680"
          fill="none"
          stroke="#7DA04D"
          strokeWidth="1"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* The main upward trend line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 5, ease: "easeInOut" }
          }}
        />

        {/* Price Point Indicator (The moving dot) */}
        <motion.circle
          cx="0"
          cy="0"
          r="6"
          fill="#7DA04D"
          filter="url(#glow)"
          animate={{
            cx: [0, 2000],
            cy: [800, 300], // Simplified linear approximation for the path
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating "Candlestick" elements */}
        {[...Array(25)].map((_, i) => {
          const isGreen = Math.random() > 0.4;
          const h = 30 + Math.random() * 60;
          return (
            <g key={`candle-${i}`}>
              {/* Wick */}
              <motion.line
                x1={80 + i * 80}
                y1={800 - i * 25 - h/2 - 10}
                x2={80 + i * 80}
                y2={800 - i * 25 + h/2 + 10}
                stroke={isGreen ? "#7DA04D" : "#ef4444"}
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.2, 0.1], transition: { duration: 2, repeat: Infinity, delay: i * 0.1 } }}
              />
              {/* Body */}
              <motion.rect
                x={76 + i * 80}
                y={800 - i * 25 - h/2}
                width="8"
                height={h}
                fill={isGreen ? "#7DA04D" : "#ef4444"}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                  scaleY: 1,
                  transition: { 
                    duration: 2.5 + Math.random() * 1.5, 
                    repeat: Infinity,
                    delay: i * 0.15
                  }
                }}
                className="origin-center"
              />
            </g>
          );
        })}

        {/* Buy/Sell Signal Indicators */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`signal-${i}`}
            d="M -10 10 L 0 0 L 10 10 Z"
            fill="#7DA04D"
            initial={{ opacity: 0, x: 200 + i * 400, y: 700 - i * 100 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [700 - i * 100, 680 - i * 100],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 1.5 
            }}
          />
        ))}
      </svg>

      {/* Live Price Ticker Overlay (Subtle) */}
      <div className="absolute top-1/4 right-10 flex flex-col items-end gap-1 opacity-20 pointer-events-none">
        <div className="text-[10px] font-mono text-brand-green uppercase tracking-widest">Live Feed</div>
        <motion.div 
          className="text-2xl font-mono font-bold text-brand-green"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          $24,892.41
        </motion.div>
      </div>
      
      {/* Radial Mask for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0C_90%)]" />
    </div>
  );
};
