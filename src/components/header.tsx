import { Hexagon } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full px-2.5 py-2 bg-border mt-4">
      <div className="flex items-center gap-1 text-lg font-medium">
        <Image
          width={20}
          height={20}
          alt="fragment's logo"
          src="/logo.png"
          className="size-4"
        />{" "}
        FRAGMENT
      </div>
    </div>
  );
}
