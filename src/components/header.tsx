import { Hexagon } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full px-2.5 py-2 bg-border mt-4">
      <div className="flex items-center gap-1 text-lg font-medium">
        <Hexagon size={20} /> FRAGMENT
      </div>
    </div>
  );
}
