import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import SectionHeading from "../ui/SectionHeading";

export default function FAQSection() {
  const { data: faqs } = useFetch(endpoints.faqs, [], []);
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 bg-surface">
      <div className="animate-float absolute top-10 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative max-w-3xl mx-auto">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="card-hover rounded-2xl bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-navy">{faq.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-navy/60 text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
