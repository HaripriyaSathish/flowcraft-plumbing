import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";
import Avatar from "../illustrations/Avatar";

export default function Testimonials() {
  const { data: testimonials } = useFetch(endpoints.testimonials, [], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[index % testimonials.length];

  const go = (dir) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-br from-navy to-blue relative overflow-hidden">
      <Quote className="absolute top-10 left-10 h-32 w-32 text-white/5" />
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" light />

        <div
          className="relative"
          onTouchStart={(e) => (window.__tsx = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - window.__tsx;
            if (dx > 50) go(-1);
            else if (dx < -50) go(1);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="card-hover-dark glass-dark rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }}>
                    <Star className={`h-5 w-5 ${i < t.rating ? "fill-warm text-warm" : "text-white/20"}`} />
                  </motion.div>
                ))}
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8">"{t.review}"</p>
              <div className="flex items-center justify-center gap-3">
                {t.customer_image ? (
                  <img src={t.customer_image} alt={t.customer_name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <Avatar name={t.customer_name} size={48} />
                )}
                <div className="text-left">
                  <p className="text-white font-semibold">{t.customer_name}</p>
                  <p className="text-white/50 text-sm">
                    {t.location}{t.service_received ? ` · ${t.service_received}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => go(-1)}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full glass-dark text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full glass-dark text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-1.5 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
