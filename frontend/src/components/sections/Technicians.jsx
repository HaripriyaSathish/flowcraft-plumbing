import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";
import Avatar from "../illustrations/Avatar";

export default function Technicians() {
  const { data: technicians } = useFetch(endpoints.technicians, [], []);
  if (!technicians.length) return null;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-surface">
      <div className="animate-float absolute top-0 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading eyebrow="Meet The Team" title="Licensed & Certified Technicians" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicians.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="card-hover rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                {t.photo ? (
                  <img src={t.photo} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-alt">
                    <Avatar name={t.name} size={88} className="icon-pop shadow-lg" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy">{t.name}</h3>
                <p className="text-sm text-blue font-medium">{t.designation}</p>
                <p className="text-xs text-navy/50 mt-1">{t.specialization}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-navy/60">
                  <BadgeCheck className="h-3.5 w-3.5 text-blue" />
                  {t.years_experience}+ Years Experience
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
