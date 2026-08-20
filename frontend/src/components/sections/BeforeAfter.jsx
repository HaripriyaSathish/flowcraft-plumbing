import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";
import ServiceVisual from "../illustrations/ServiceVisual";

function CompareSlider({ item }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="card-hover relative aspect-[4/3] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-lg"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        {item.after_image ? (
          <img src={item.after_image} alt={`${item.title} after`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        ) : (
          <div className="absolute inset-0">
            <ServiceVisual icon={CheckCircle2} />
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          {item.before_image ? (
            <img
              src={item.before_image}
              alt={`${item.title} before`}
              className="h-full object-cover"
              style={{ width: containerRef.current?.offsetWidth || "100%" }}
              draggable={false}
            />
          ) : (
            <div className="h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
              <ServiceVisual icon={AlertTriangle} muted />
            </div>
          )}
        </div>

        <div className="absolute top-3 left-3 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold text-white">Before</div>
        <div className="absolute top-3 right-3 rounded-full bg-blue/80 px-3 py-1 text-xs font-semibold text-white">After</div>

        <div
          className="absolute top-0 bottom-0 flex items-center justify-center"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-white/80" />
          <div className="absolute h-9 w-9 rounded-full bg-white shadow-lg flex items-center justify-center">
            <MoveHorizontal className="h-4 w-4 text-navy" />
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-navy/70">{item.title}</p>
    </div>
  );
}

export default function BeforeAfter() {
  const { data: items } = useFetch(endpoints.beforeAfter, [], []);
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Real Results"
          title="Before & After"
          description="Drag the slider to see the FlowCraft transformation."
        />
        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <CompareSlider item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
