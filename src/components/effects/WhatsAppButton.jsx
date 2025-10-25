"use client";

import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const DEFAULT_MESSAGE =
  "Hi AIL Studio, I’d love to discuss a new project. Could we chat?";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
  const href = useMemo(() => buildWhatsAppUrl(phone, DEFAULT_MESSAGE), [phone]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="Chat"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 md:bottom-8 md:right-8"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/20">
        <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="pr-5 text-sm font-medium leading-none">WhatsApp</span>
    </a>
  );
}
