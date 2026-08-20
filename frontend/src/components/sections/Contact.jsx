import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, Loader2, CheckCircle2 } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { telHref, mailHref, whatsappHref } from "../../lib/contact";
import SectionHeading from "../ui/SectionHeading";

const dayLabels = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };

export default function Contact() {
  const { data: contact } = useFetch(endpoints.contactInfo, {}, []);
  const { data: hours } = useFetch(endpoints.businessHours, [], []);
  const { data: map } = useFetch(endpoints.mapSettings, {}, []);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await endpoints.createServiceRequest({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        service_name_text: "General Enquiry",
        problem_description: form.message,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const address = [contact?.address_line, contact?.city, contact?.state, contact?.postal_code].filter(Boolean).join(", ");

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="animate-float absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-warm/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading eyebrow="Contact Us" title="Get In Touch" description="Reach out anytime — we're here to help." />

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Phone", value: contact?.phone, href: telHref(contact?.phone) },
              { icon: Mail, label: "Email", value: contact?.email, href: mailHref(contact?.email) },
              { icon: MessageCircle, label: "WhatsApp", value: contact?.whatsapp_number, href: whatsappHref(contact?.whatsapp_number, contact?.whatsapp_default_message) },
              { icon: MapPin, label: "Address", value: address },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href || undefined}
                target={item.label === "WhatsApp" ? "_blank" : undefined}
                rel="noreferrer"
                className="card-hover group flex items-start gap-4 rounded-2xl bg-surface p-5 hover:bg-blue/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <item.icon className="icon-pop h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy/40 font-semibold">{item.label}</p>
                  <p className="text-navy font-medium mt-0.5">{item.value || "—"}</p>
                </div>
              </a>
            ))}

            <div className="card-hover group flex items-start gap-4 rounded-2xl bg-surface p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <Clock className="icon-pop h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-navy/40 font-semibold mb-2">Business Hours</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  {hours.map((h) => (
                    <div key={h.id} className="flex justify-between gap-2 text-navy/70">
                      <span>{dayLabels[h.day]}</span>
                      <span className="font-medium text-navy">
                        {h.is_24_hours ? "24 Hours" : h.is_closed ? "Closed" : `${h.opening_time?.slice(0, 5)} - ${h.closing_time?.slice(0, 5)}`}
                      </span>
                    </div>
                  ))}
                </div>
                {contact?.emergency_availability_text && (
                  <p className="text-xs text-blue font-semibold mt-3">{contact.emergency_availability_text}</p>
                )}
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl bg-surface p-7 md:p-9 space-y-4"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-blue mb-4" />
                <h3 className="text-lg font-bold text-navy mb-1">Message Sent</h3>
                <p className="text-navy/60 text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Your Name" className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  <input required placeholder="Phone Number" className="input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                </div>
                <input type="email" placeholder="Email" className="input w-full" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={5}
                  className="input w-full resize-none"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
                {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-glow w-full flex items-center justify-center gap-2 rounded-full bg-navy py-4 font-semibold text-white hover:bg-blue transition disabled:opacity-60"
                >
                  {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </motion.form>
        </div>

        {map?.embed_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14"
          >
            <h3 className="text-xl font-bold text-navy mb-4">Find Our Service Centre</h3>
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-video">
              <iframe src={map.embed_url} className="h-full w-full border-0" loading="lazy" allowFullScreen title="FlowCraft Plumbing location" />
            </div>
            {map.directions_url && (
              <a
                href={map.directions_url}
                target="_blank"
                rel="noreferrer"
                className="btn-glow inline-flex items-center gap-2 mt-4 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
