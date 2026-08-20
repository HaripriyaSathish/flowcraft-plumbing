import { motion } from "framer-motion";

/**
 * Animated "blueprint" pipe-network illustration used as the hero
 * background when no photo/video has been uploaded via the admin.
 * Fully self-contained SVG — no external image dependency.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-blue overflow-hidden">
      <div className="absolute inset-0 blueprint-pattern opacity-60" />

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2EA8FF" stopOpacity="0.55" />
              <stop offset="1" stopColor="#2EA8FF" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#pipeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-50 150 H300 a30 30 0 0 1 30 30 V400 a30 30 0 0 0 30 30 H900 a30 30 0 0 1 30 30 V700" />
            <path d="M-50 400 H150 a30 30 0 0 1 30 30 V550 a30 30 0 0 0 30 30 H700" />
            <path d="M1250 100 H950 a30 30 0 0 0 -30 30 V300 a30 30 0 0 1 -30 30 H600 a30 30 0 0 0 -30 30 V550" />
            <path className="pipe-flow" d="M-50 150 H300 a30 30 0 0 1 30 30 V400 a30 30 0 0 0 30 30 H900 a30 30 0 0 1 30 30 V700" stroke="#2EA8FF" strokeOpacity="0.9" />
            <path className="pipe-flow" d="M1250 100 H950 a30 30 0 0 0 -30 30 V300 a30 30 0 0 1 -30 30 H600 a30 30 0 0 0 -30 30 V550" stroke="#2EA8FF" strokeOpacity="0.7" />
          </g>
          {[
            [300, 150], [360, 400], [900, 430], [930, 700],
            [950, 130], [600, 330], [570, 550],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill="#2EA8FF" opacity="0.7" />
          ))}
        </svg>
      </motion.div>

      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue/20 blur-3xl" />
    </div>
  );
}
