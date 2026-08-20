import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../api/client";
import { getIcon } from "../../lib/icons";

export default function TrustMarquee() {
  const { data: features } = useFetch(endpoints.whyChooseUs, [], []);
  if (!features.length) return null;

  const track = [...features, ...features];

  return (
    <div className="relative overflow-hidden bg-navy py-4 border-y border-white/5">
      <div className="flex w-max animate-marquee gap-12">
        {track.map((f, i) => {
          const Icon = getIcon(f.icon_name);
          return (
            <div key={`${f.id}-${i}`} className="flex items-center gap-2.5 shrink-0 text-white/60 text-sm font-medium">
              <Icon className="h-4 w-4 text-accent" />
              {f.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
