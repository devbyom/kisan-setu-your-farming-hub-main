import { useMemo } from "react";
import { motion } from "framer-motion";

const WheatStalk = ({ x, delay, height }: { x: number; delay: number; height: number }) => (
  <motion.div
    className="absolute bottom-0"
    style={{ left: `${x}%` }}
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ delay: delay * 0.05, duration: 1, ease: "easeOut" }}
  >
    <div
      className="animate-sway"
      style={{
        animationDelay: `${delay * 0.15}s`,
        transformOrigin: "bottom center",
      }}
    >
      {/* Stalk */}
      <div
        className="w-[2px] md:w-[3px] rounded-full mx-auto"
        style={{
          height: `${height}px`,
          background: `linear-gradient(to top, hsl(122, 46%, 33%), hsl(40, 80%, 55%))`,
        }}
      />
      {/* Wheat head */}
      <div
        className="text-center -mt-2"
        style={{ fontSize: `${Math.max(10, height / 8)}px` }}
      >
        🌾
      </div>
    </div>
  </motion.div>
);

const Particle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const size = Math.random() * 3 + 1;
  return (
    <div
      className="absolute animate-float-up rounded-full bg-gold/60"
      style={{
        left: `${x}%`,
        bottom: '10%',
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    />
  );
};

export const WheatField = () => {
  const stalks = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      x: (i / 60) * 100 + Math.random() * 2 - 1,
      delay: i,
      height: 80 + Math.random() * 80,
    })),
    []
  );

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({ delay: i * 0.5 })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-amber-100 to-sky" />

      {/* Sun */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full animate-sun-rise"
        style={{
          background: 'radial-gradient(circle, hsl(40, 100%, 70%), hsl(25, 100%, 50%) 60%, transparent 70%)',
          boxShadow: '0 0 80px 40px hsl(40, 100%, 70%, 0.3)',
        }}
      />

      {/* Distant hills */}
      <svg className="absolute bottom-[25%] w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="hsl(122, 30%, 40%, 0.4)" d="M0,200 C200,100 400,150 600,120 C800,90 1000,140 1200,110 C1350,90 1440,130 1440,200 Z" />
      </svg>
      <svg className="absolute bottom-[15%] w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="hsl(122, 35%, 35%, 0.5)" d="M0,200 C300,130 500,170 700,140 C900,110 1100,160 1300,130 C1400,120 1440,150 1440,200 Z" />
      </svg>

      {/* Wheat field area */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%]">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-earth/80 to-crop/60" />

        {/* Stalks */}
        {stalks.map((s, i) => (
          <WheatStalk key={i} x={s.x} delay={s.delay} height={s.height} />
        ))}
      </div>

      {/* Floating particles (pollen/dust) */}
      {particles.map((p, i) => (
        <Particle key={i} delay={p.delay} />
      ))}
    </div>
  );
};
