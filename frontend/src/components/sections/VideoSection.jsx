import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video as VideoIcon } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";
import ServiceVisual from "../illustrations/ServiceVisual";

export default function VideoSection() {
  const { data: videos } = useFetch(endpoints.videos, [], []);
  const [active, setActive] = useState(null);

  const featured = videos.find((v) => v.is_featured) || videos[0];
  if (!featured) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="See Us In Action"
          title="Professional Plumbing, Up Close"
          description="A closer look at the craftsmanship behind every FlowCraft repair and installation."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card-hover-dark relative rounded-3xl overflow-hidden aspect-video shadow-2xl group cursor-pointer"
          onClick={() => featured.video && setActive(featured)}
        >
          {featured.thumbnail ? (
            <img src={featured.thumbnail} alt={featured.title} className="h-full w-full object-cover" />
          ) : (
            <ServiceVisual icon={VideoIcon} />
          )}
          <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/55 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl"
            >
              <Play className="h-8 w-8 text-navy ml-1" fill="currentColor" />
            </motion.span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy/90 to-transparent">
            <h3 className="text-white font-bold text-lg">{featured.title}</h3>
            {featured.description && <p className="text-white/70 text-sm mt-1">{featured.description}</p>}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full glass-dark text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              src={active.video}
              controls
              autoPlay
              className="max-h-[85vh] w-full max-w-4xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
