import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../api/client";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferred_date: "",
  preferred_time: "",
  address: "",
  problem_description: "",
};

export default function BookingModal() {
  const { isOpen, presetService, closeBooking } = useBooking();
  const { data: services } = useFetch(endpoints.services, [], []);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm, service: presetService?.id ?? "" });
      setStatus("idle");
    }
  }, [isOpen, presetService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await endpoints.createServiceRequest({
        ...form,
        service: form.service || null,
        email: form.email || undefined,
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-navy/60 backdrop-blur-sm p-0 md:p-6"
          onClick={closeBooking}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-lg max-h-[92svh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={closeBooking}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-navy/60 hover:bg-navy/10 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-7 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 className="h-14 w-14 text-blue mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-2">Booking Request Received!</h3>
                  <p className="text-navy/60 mb-6">
                    Thank you, {form.name.split(" ")[0]}. Our team will contact you shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={closeBooking}
                    className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-navy mb-1">Book a Plumber</h3>
                  <p className="text-navy/50 text-sm mb-6">Fill in your details and we'll confirm your appointment.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" />
                      <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
                    </div>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="input w-full" />

                    <select required name="service" value={form.service} onChange={handleChange} className="input w-full">
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} className="input" />
                      <input type="time" name="preferred_time" value={form.preferred_time} onChange={handleChange} className="input" />
                    </div>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Address"
                      rows={2}
                      className="input w-full resize-none"
                    />
                    <textarea
                      name="problem_description"
                      value={form.problem_description}
                      onChange={handleChange}
                      placeholder="Describe the problem"
                      rows={3}
                      className="input w-full resize-none"
                    />

                    {status === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again or call us directly.</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-glow w-full flex items-center justify-center gap-2 rounded-full bg-accent py-4 font-semibold text-navy shadow-lg disabled:opacity-60"
                    >
                      {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {status === "submitting" ? "Submitting..." : "Confirm Booking"}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
