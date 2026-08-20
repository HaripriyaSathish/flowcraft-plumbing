import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Zap, Droplets, ShowerHead, Flame, GitBranch, AlertTriangle } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { telHref, whatsappHref } from "../../lib/contact";
import MagneticButton from "../ui/MagneticButton";

const scenarios = [
  { icon: Zap, label: "Burst Pipes" },
  { icon: Droplets, label: "Major Water Leaks" },
  { icon: AlertTriangle, label: "Blocked Drains" },
  { icon: ShowerHead, label: "Overflowing Toilets" },
  { icon: Flame, label: "Water Heater Failure" },
  { icon: GitBranch, label: "Sewer Problems" },
];

export default function EmergencySection() {
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-blue/40" />
      <motion.div
        className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-warm/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5"
        >
          When Water Can't Wait, We Respond.
        </motion.h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-14">
          Our emergency response team is on standby around the clock for the moments that can't wait.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ scale: 1.05 }}
              className="card-hover-dark group glass-dark rounded-2xl px-5 py-6 flex flex-col items-center gap-3"
            >
              <s.icon className="icon-pop h-7 w-7 text-warm" />
              <span className="text-white text-sm font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <MagneticButton className="inline-block">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={telHref(contact?.emergency_phone || contact?.phone)}
              className="btn-glow-warm flex items-center gap-2 rounded-full bg-warm px-8 py-4 text-base font-bold text-navy shadow-[0_0_40px_rgba(245,166,35,0.4)]"
            >
              <PhoneCall className="h-5 w-5" /> Call Emergency Plumber
            </motion.a>
          </MagneticButton>
          <MagneticButton className="inline-block">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={whatsappHref(contact?.whatsapp_number, contact?.whatsapp_default_message)}
              target="_blank"
              rel="noreferrer"
              className="btn-glow-dark glass-dark flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </motion.a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
