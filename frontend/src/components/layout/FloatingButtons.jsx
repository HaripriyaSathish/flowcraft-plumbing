import { motion } from "framer-motion";
import { MessageCircle, PhoneCall, Mail } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { telHref, mailHref, whatsappHref } from "../../lib/contact";

const buttons = [
  { key: "whatsapp", icon: MessageCircle, tooltip: "Chat on WhatsApp", className: "bg-[#25D366] hover:shadow-[0_0_0_1px_rgba(37,211,102,0.5),0_0_24px_4px_rgba(37,211,102,0.55)]" },
  { key: "call", icon: PhoneCall, tooltip: "Call Now", className: "bg-blue hover:shadow-[0_0_0_1px_rgba(46,168,255,0.5),0_0_24px_4px_rgba(46,168,255,0.55)]" },
  { key: "email", icon: Mail, tooltip: "Email Us", className: "bg-navy hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_0_24px_4px_rgba(46,168,255,0.4)]" },
];

export default function FloatingButtons() {
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);

  const hrefFor = (key) => {
    if (key === "whatsapp") return whatsappHref(contact?.whatsapp_number, contact?.whatsapp_default_message);
    if (key === "call") return telHref(contact?.phone);
    return mailHref(contact?.email);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-5 md:right-8 z-40 flex flex-col gap-3">
      {buttons.map((b, i) => (
        <motion.a
          key={b.key}
          href={hrefFor(b.key)}
          target={b.key === "whatsapp" ? "_blank" : undefined}
          rel="noreferrer"
          initial={{ opacity: 0, scale: 0, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 260 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className={`group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full transition-shadow duration-300 ${b.className} text-white shadow-lg`}
        >
          <b.icon className="h-5 w-5 md:h-6 md:w-6" />
          <span className="hidden md:block absolute right-full mr-3 whitespace-nowrap rounded-lg glass px-3 py-1.5 text-xs font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {b.tooltip}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
