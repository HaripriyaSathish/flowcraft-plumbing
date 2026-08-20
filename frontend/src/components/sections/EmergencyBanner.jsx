import { motion } from "framer-motion";
import { AlarmClock, PhoneCall, MessageCircle } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { telHref, whatsappHref } from "../../lib/contact";

export default function EmergencyBanner() {
  const { data: banner } = useFetch(endpoints.emergencyBanner, {}, []);
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);

  if (!banner?.heading) return null;

  return (
    <section className="relative bg-gradient-to-r from-navy to-blue py-5 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-warm/20">
            <span className="absolute inset-0 rounded-full bg-warm/40 animate-pulse-ring" />
            <AlarmClock className="h-5 w-5 text-warm relative z-10" />
          </span>
          <div>
            <p className="text-white font-semibold leading-tight">{banner.heading}</p>
            {banner.subtext && <p className="text-white/60 text-sm">{banner.subtext}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={telHref(contact?.emergency_phone || contact?.phone)}
            className="btn-glow-warm flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            <PhoneCall className="h-4 w-4" /> Call Now
          </a>
          <a
            href={whatsappHref(contact?.whatsapp_number, contact?.whatsapp_default_message)}
            target="_blank"
            rel="noreferrer"
            className="btn-glow-dark glass-dark flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
