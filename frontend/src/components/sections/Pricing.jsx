import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { useBooking } from "../../context/BookingContext";
import SectionHeading from "../ui/SectionHeading";

export default function Pricing() {
  const { data: packages } = useFetch(endpoints.packages, [], []);
  const { openBooking } = useBooking();
  if (!packages.length) return null;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="animate-float absolute top-0 left-1/3 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow="Pricing" title="Simple, Transparent Packages" description="No hidden fees. Choose the plan that fits your needs." />

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-shadow duration-300 ${
                pkg.is_popular
                  ? "bg-navy text-white shadow-2xl scale-[1.03] hover:shadow-[0_0_50px_10px_rgba(46,168,255,0.35)]"
                  : "bg-surface text-navy hover:shadow-xl"
              }`}
            >
              {pkg.is_popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-warm px-4 py-1 text-xs font-bold text-navy">
                  <Star className="h-3 w-3 fill-navy" /> Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.is_popular ? "text-white/60" : "text-navy/50"}`}>{pkg.description}</p>
              <p className="mb-6">
                <span className="text-4xl font-bold">₹{Number(pkg.price).toLocaleString()}</span>
                <span className={`text-sm ml-1 ${pkg.is_popular ? "text-white/50" : "text-navy/50"}`}>{pkg.price_unit}</span>
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {(pkg.features || []).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className={`h-4 w-4 shrink-0 ${pkg.is_popular ? "text-accent" : "text-blue"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openBooking()}
                className={`btn-glow w-full rounded-full py-3.5 font-semibold transition ${
                  pkg.is_popular ? "bg-accent text-navy hover:brightness-105" : "bg-navy text-white hover:bg-blue"
                }`}
              >
                {pkg.cta_text || "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
