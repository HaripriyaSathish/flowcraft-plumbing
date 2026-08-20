import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Clock, BadgeCheck, Receipt, ChevronDown, PhoneCall } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { useBooking } from "../../context/BookingContext";
import { telHref } from "../../lib/contact";
import HeroBackground from "../illustrations/HeroBackground";
import MagneticButton from "../ui/MagneticButton";

const badgeItems = [
  { key: "show_emergency_badge", icon: Clock, label: "Emergency Service Available" },
  { key: "show_fast_response_badge", icon: BadgeCheck, label: "Fast Response" },
  { key: "show_licensed_badge", icon: ShieldCheck, label: "Licensed & Certified" },
  { key: "show_transparent_pricing_badge", icon: Receipt, label: "Transparent Pricing" },
];

export default function Hero() {
  const { data: hero } = useFetch(endpoints.hero, {}, []);
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);
  const { openBooking } = useBooking();

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heading = hero?.heading || "Reliable Plumbing. Done Right the First Time.";
  const subheading =
    hero?.subheading ||
    "Professional plumbing solutions for homes, offices and commercial properties — available when you need us.";
  const bgImage = hero?.background_image;
  const bgVideo = hero?.background_video;

  return (
    <section ref={sectionRef} id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy">
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        {bgVideo ? (
          <video
            className="h-full w-full object-cover scale-110 animate-[float_18s_ease-in-out_infinite]"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={bgImage || undefined}
          />
        ) : bgImage ? (
          <motion.img
            src={bgImage}
            alt="Professional plumbing service"
            className="h-[112%] w-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
        ) : (
          <HeroBackground />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/40" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        {hero?.badge_text && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="animate-float glass-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium text-white"
          >
            <ShieldCheck className="h-4 w-4 text-accent" />
            {hero.badge_text}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl"
        >
          {heading.split(". ").map((chunk, i, arr) => (
            <span key={i}>
              {chunk}
              {i < arr.length - 1 ? ". " : ""}
              {i === 0 && <br className="hidden md:block" />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton className="inline-block">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openBooking()}
              className="btn-glow rounded-full bg-accent px-8 py-4 text-base font-semibold text-navy shadow-[0_0_40px_rgba(46,168,255,0.45)]"
            >
              {hero?.cta_primary_text || "Book a Plumber"}
            </motion.button>
          </MagneticButton>
          <MagneticButton className="inline-block">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={telHref(contact?.phone)}
              className="btn-glow-dark glass-dark flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              <PhoneCall className="h-5 w-5" />
              {hero?.cta_secondary_text || "Call Now"}
            </motion.a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
        >
          {badgeItems
            .filter((b) => hero?.[b.key] !== false)
            .map((b) => (
              <div key={b.key} className="flex items-center gap-2 text-sm text-white/70">
                <b.icon className="h-4 w-4 text-accent" />
                {b.label}
              </div>
            ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
