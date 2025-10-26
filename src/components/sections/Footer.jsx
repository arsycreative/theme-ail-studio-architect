"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p>{t("legal", { year })}</p>
        <p className="text-muted-foreground">{t("tagline")}</p>
      </div>
    </footer>
  );
}
