import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";

export default function ServiceAreas() {
  const { data: areas } = useFetch(endpoints.serviceAreas, [], []);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="animate-float absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow="Where We Work" title="Our Service Areas" description="Proudly serving these areas with fast, reliable plumbing service." />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.06, duration: 0.4 }}
              className="card-hover group flex items-start gap-3 rounded-2xl bg-surface p-5 hover:bg-blue/5"
            >
              <MapPin className="icon-pop h-5 w-5 text-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-navy">{a.area || a.city}</p>
                <p className="text-xs text-navy/50">{a.city}</p>
                {a.description && <p className="text-sm text-navy/60 mt-1">{a.description}</p>}
                <div className="flex items-center gap-1.5 mt-2 text-xs text-blue font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Service Available
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
