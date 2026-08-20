import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall, Droplets } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { useBooking } from "../../context/BookingContext";
import { telHref } from "../../lib/contact";
import MagneticButton from "../ui/MagneticButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: site } = useFetch(endpoints.siteSettings, {}, []);
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display font-extrabold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-accent text-white">
            <Droplets className="h-5 w-5" />
          </span>
          <span className={scrolled ? "text-navy" : "text-white"}>{site?.site_name || "FlowCraft Plumbing"}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium transition-colors ${
                scrolled ? "text-navy/70 hover:text-navy" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-blue" : "bg-accent"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={telHref(contact?.phone)}
            className={`flex items-center gap-2 text-sm font-semibold ${scrolled ? "text-navy" : "text-white"}`}
          >
            <PhoneCall className="h-4 w-4" /> {contact?.phone}
          </a>
          <MagneticButton as="span" className="inline-block" strength={0.25}>
            <button
              onClick={() => openBooking()}
              className="btn-glow rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-105 transition"
            >
              Book Now
            </button>
          </MagneticButton>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full ${scrolled ? "text-navy" : "text-white"}`}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-white font-bold text-lg">{site?.site_name || "FlowCraft Plumbing"}</span>
              <button onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col px-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-lg font-medium text-white/80 border-b border-white/10"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openBooking();
                }}
                className="mt-6 rounded-full bg-accent py-4 text-base font-semibold text-navy"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
