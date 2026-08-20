export function telHref(phone) {
  if (!phone) return "#";
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailHref(email) {
  if (!email) return "#";
  return `mailto:${email}`;
}

export function whatsappHref(number, message) {
  if (!number) return "#";
  const digits = number.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "Hi, I need plumbing service. Please share the available options and pricing.");
  return `https://wa.me/${digits}?text=${text}`;
}
