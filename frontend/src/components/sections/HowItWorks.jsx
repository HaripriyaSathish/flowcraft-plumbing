import { motion } from "framer-motion";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { getIcon } from "../../lib/icons";
import SectionHeading from "../ui/SectionHeading";

export default function HowItWorks() {
  const { data: steps } = useFetch(endpoints.howItWorks, [], []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="How It Works" title="Simple, Fast & Hassle-Free" />

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent" />
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon_name);
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative flex md:flex-col gap-4 md:gap-0 md:text-center"
              >
                <div className="btn-glow relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-navy shadow-lg md:mx-auto md:mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-white" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-warm text-xs font-bold text-navy">
                    {String(step.step_number).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1.5">{step.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
