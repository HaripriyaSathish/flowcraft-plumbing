import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Wraps a button/link so it subtly follows the cursor within its bounds
 * on hover (the "magnetic CTA" effect), snapping back on mouse leave.
 * Pass strength to tune the pull (default is a restrained, premium feel).
 */
export default function MagneticButton({ as: As = motion.div, className = "", strength = 0.35, children, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return (
    <As
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "translate(var(--mx, 0px), var(--my, 0px))",
        transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={className}
      {...props}
    >
      {children}
    </As>
  );
}
