const palette = [
  ["#2EA8FF", "#1261A0"],
  ["#F5A623", "#c9860f"],
  ["#1261A0", "#0B1726"],
  ["#2EA8FF", "#0B1726"],
];

function hashName(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "FC";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

/**
 * Initials-based avatar shown until a real headshot is uploaded via the
 * admin. Deliberately looks like "photo pending" rather than a fake photo.
 */
export default function Avatar({ name, size = 56, className = "" }) {
  const [from, to] = palette[hashName(name) % palette.length];
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {initials(name)}
    </div>
  );
}
