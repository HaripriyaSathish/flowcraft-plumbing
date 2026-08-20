import { Droplets } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { telHref, mailHref, whatsappHref } from "../../lib/contact";
import { socialIconMap, FacebookIcon } from "../icons/SocialIcons";

const serviceLinks = [
  "Residential Plumbing", "Emergency Plumbing", "Drain Cleaning", "Pipe Repair", "Water Heater Services", "Commercial Plumbing",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { data: site } = useFetch(endpoints.siteSettings, {}, []);
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);
  const { data: socials } = useFetch(endpoints.socialLinks, [], []);

  const address = [contact?.address_line, contact?.city, contact?.state].filter(Boolean).join(", ");

  return (
    <footer className="bg-navy pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-display font-extrabold text-lg text-white mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-accent">
              <Droplets className="h-5 w-5" />
            </span>
            {site?.site_name || "FlowCraft Plumbing"}
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            {site?.footer_description ||
              "Licensed, insured plumbing experts delivering premium residential and commercial plumbing services."}
          </p>
          {!!socials.length && (
            <div className="flex gap-3 mt-5">
              {socials.map((s) => {
                const Icon = socialIconMap[s.platform] || FacebookIcon;
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glow flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-navy hover:scale-110 transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s}><a href="#services" className="inline-block text-white/50 hover:text-accent hover:translate-x-1 text-sm transition-all">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="inline-block text-white/50 hover:text-accent hover:translate-x-1 text-sm transition-all">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li><a href={telHref(contact?.phone)} className="hover:text-accent transition-colors">{contact?.phone}</a></li>
            <li><a href={mailHref(contact?.email)} className="hover:text-accent transition-colors">{contact?.email}</a></li>
            <li><a href={whatsappHref(contact?.whatsapp_number, contact?.whatsapp_default_message)} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">WhatsApp Us</a></li>
            <li>{address}</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-white/30 text-xs pt-8">
        © {new Date().getFullYear()} {site?.site_name || "FlowCraft Plumbing"}. All rights reserved.
        {" "}Demo photography by{" "}
        <a href="https://htmlcodex.com/" target="_blank" rel="noreferrer" className="underline hover:text-white/60">
          HTML Codex
        </a>
        .
      </p>
    </footer>
  );
}
