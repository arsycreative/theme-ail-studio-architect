"use client";

import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const t = useTranslations("whatsAppButton");
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
  const message = t("message");
  const label = t("label");
  const href = useMemo(() => buildWhatsAppUrl(phone, message), [phone, message]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t("ariaLabel", { default: "Chat on WhatsApp" })}
      data-cursor={label}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 md:bottom-8 md:right-8"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/20">
        <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="pr-5 text-sm font-medium leading-none">{label}</span>
    </a>
  );
}
