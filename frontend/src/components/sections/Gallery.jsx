import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Home, Building2, ShowerHead, CookingPot, Wrench, Flame, Siren, Hammer } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";
import ServiceVisual from "../illustrations/ServiceVisual";

const categoryIcons = {
  residential: Home,
  commercial: Building2,
  bathroom: ShowerHead,
  kitchen: CookingPot,
  "pipe-repair": Wrench,
  "water-heater": Flame,
  "emergency-work": Siren,
};

export default function Gallery() {
  const { data: categories } = useFetch(endpoints.projectCategories, [], []);
  const { data: projects } = useFetch(endpoints.projects, [], []);
  const [activeCat, setActiveCat] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (activeCat === "all" ? projects : projects.filter((p) => p.category_slug === activeCat)),
    [projects, activeCat]
  );

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-surface">
      <div className="animate-float absolute -top-20 right-0 h-80 w-80 rounded-full bg-warm/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading eyebrow="Our Work" title="Completed Projects" />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveCat("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeCat === "all" ? "bg-navy text-white" : "bg-white text-navy/60 hover:bg-navy/5"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.slug)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeCat === c.slug ? "bg-navy text-white" : "bg-white text-navy/60 hover:bg-navy/5"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="card-hover relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setLightbox(p)}
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-56 w-full transition-transform duration-500 group-hover:scale-105">
                    <ServiceVisual icon={categoryIcons[p.category_slug] || Hammer} />
                  </div>
                )}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-semibold">{p.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full glass-dark text-white">
              <X className="h-5 w-5" />
            </button>
            {lightbox.image ? (
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="h-[70vh] w-[70vh] max-w-full rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <ServiceVisual icon={categoryIcons[lightbox.category_slug] || Hammer} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
