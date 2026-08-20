import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function AnimatedCounter({ to = 0, suffix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
