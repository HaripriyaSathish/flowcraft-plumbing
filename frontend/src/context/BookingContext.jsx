import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState(null);

  const openBooking = useCallback((service = null) => {
    setPresetService(service);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPresetService(null);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, presetService, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
