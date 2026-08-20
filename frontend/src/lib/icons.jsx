import * as Icons from "lucide-react";

export function getIcon(name, fallback = "Wrench") {
  return Icons[name] || Icons[fallback] || Icons.Wrench;
}
