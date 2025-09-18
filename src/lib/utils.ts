import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "https://crypto-fund-nine.vercel.app";
// process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";
