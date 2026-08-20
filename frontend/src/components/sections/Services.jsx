import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { getIcon } from "../../lib/icons";
import { useBooking } from "../../context/BookingContext";
import SectionHeading from "../ui/SectionHeading";
import { SkeletonGrid } from "../ui/Skeleton";
import ServiceVisual from "../illustrations/ServiceVisual";

export default function Services() {
  const { data: services, loading } = useFetch(endpoints.services, [], []);
  const { openBooking } = useBooking();

  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-surface">
      <div className="animate-float absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue/10 blur-3xl" />
      <div className="animate-float absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" style={{ animationDelay: "2s" }} />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Services"
          title="Complete Plumbing Solutions"
          description="From minor repairs to full installations — our licensed technicians handle it all with precision and care."
        />

        {loading ? (
          <SkeletonGrid count={6} className="md:grid-cols-2 lg:grid-cols-3" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon_name);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                        <ServiceVisual icon={Icon} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl glass transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="h-5 w-5 text-blue" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-2">{service.name}</h3>
                    <p className="text-sm text-navy/60 leading-relaxed mb-4 min-h-[40px]">
                      {service.short_description}
                    </p>
                    <div className="flex items-center justify-between">
                      {service.starting_price ? (
                        <p className="text-sm text-navy/50">
                          {service.price_unit}{" "}
                          <span className="text-base font-bold text-navy">₹{Number(service.starting_price).toLocaleString()}</span>
                        </p>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={() => openBooking(service)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-blue transition-all group-hover:gap-2.5"
                      >
                        Book Service
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
