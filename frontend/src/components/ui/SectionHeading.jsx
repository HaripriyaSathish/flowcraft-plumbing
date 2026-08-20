import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "center", light = false }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${alignment} gap-4 mb-12 md:mb-16`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full ${
            light ? "bg-white/10 text-accent" : "bg-blue/10 text-blue"
          }`}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={`text-3xl md:text-5xl font-bold leading-tight max-w-3xl ${light ? "text-white" : "text-navy"}`}>
        {title.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.035 }}
            className="inline-block"
          >
            {word}
            {" "}
          </motion.span>
        ))}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${light ? "text-white/70" : "text-navy/60"}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
