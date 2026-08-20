import { motion } from "framer-motion";

/**
 * Brand illustration tile used wherever a real uploaded photo isn't
 * available yet (services, gallery, before/after, video thumbnails).
 * Purely CSS/SVG — no network image dependency — and always themed to
 * the specific Lucide icon passed in, so it's never a generic/irrelevant
 * placeholder.
 */
export default function ServiceVisual({ icon: Icon, className = "", compact = false, muted = false }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${
        muted ? "from-navy/70 via-navy-light/70 to-blue/40 saturate-50" : "from-navy via-blue to-blue-light"
      } ${className}`}
    >
      <div className="absolute inset-0 blueprint-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(46,168,255,0.35),transparent_60%)]" />

      {Icon && (
        <motion.div
          className="absolute -bottom-6 -right-6 text-white/10"
          initial={{ rotate: -8 }}
          animate={{ rotate: [-8, -4, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={compact ? 96 : 176} strokeWidth={1.2} />
        </motion.div>
      )}

      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`icon-pop flex items-center justify-center rounded-2xl glass-dark ${compact ? "h-12 w-12" : "h-20 w-20"}`}>
            <Icon className="text-accent" size={compact ? 22 : 36} strokeWidth={1.75} />
          </div>
        </div>
      )}
    </div>
  );
}
