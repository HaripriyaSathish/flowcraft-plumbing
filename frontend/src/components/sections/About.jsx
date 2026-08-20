import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Wrench } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import AnimatedCounter from "../ui/AnimatedCounter";
import ServiceVisual from "../illustrations/ServiceVisual";

export default function About() {
  const { data: info } = useFetch(endpoints.companyInfo, {}, []);

  const stats = [
    { label: "Years Experience", value: info?.years_experience ?? 15, suffix: "+" },
    { label: "Jobs Completed", value: info?.jobs_completed ?? 5000, suffix: "+" },
    { label: "Happy Customers", value: info?.happy_customers ?? 3500, suffix: "+" },
    { label: "Support", value: null, display: info?.support_availability || "24/7" },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
      <div className="animate-float absolute top-1/4 -right-32 h-72 w-72 rounded-full bg-warm/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="card-hover relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            {info?.image ? (
              <img src={info.image} alt="FlowCraft Plumbing technician at work" className="h-full w-full object-cover" />
            ) : (
              <ServiceVisual icon={Wrench} />
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 md:-right-8 glass rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <ShieldCheck className="h-8 w-8 text-blue" />
            <div>
              <p className="font-bold text-navy text-lg leading-none">{info?.certified_technicians ?? 20}+</p>
              <p className="text-xs text-navy/60">Certified Technicians</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-blue/10 text-blue mb-5">
            <MapPin className="h-3.5 w-3.5" /> About FlowCraft Plumbing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy leading-tight mb-6">
            {info?.headline || "Craftsmanship you can trust, service you can rely on."}
          </h2>
          <p className="text-navy/60 text-lg leading-relaxed mb-10">
            {info?.description ||
              "For over 15 years, FlowCraft Plumbing has been the trusted plumbing partner for homeowners and businesses alike."}
          </p>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.04 }}
                className="card-hover rounded-2xl bg-surface p-5 hover:bg-blue/5"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient">
                  {s.value !== null ? <AnimatedCounter to={s.value} suffix={s.suffix} /> : s.display}
                </p>
                <p className="text-sm text-navy/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
