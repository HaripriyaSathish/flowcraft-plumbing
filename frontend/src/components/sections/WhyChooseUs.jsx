import { motion } from "framer-motion";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { getIcon } from "../../lib/icons";
import SectionHeading from "../ui/SectionHeading";

export default function WhyChooseUs() {
  const { data: features } = useFetch(endpoints.whyChooseUs, [], []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-navy relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The FlowCraft Difference"
          description="Every job backed by licensed expertise, transparent pricing and a satisfaction guarantee."
          light
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon_name);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="card-hover-dark group glass-dark rounded-2xl p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 mb-4">
                  <Icon className="icon-pop h-6 w-6 text-accent" />
                </div>
                <h3 className="text-white font-semibold mb-1.5">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
