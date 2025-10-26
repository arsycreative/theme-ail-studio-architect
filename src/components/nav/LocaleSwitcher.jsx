"use client";

import { Link, usePathname } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav.language");
  console.log("pathname", pathname);
  console.log("locale", locale);

  const basePath = pathname.replace(/^\/(en|id)(?=\/|$)/, "") || "/";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-1 py-1 text-xs"
      role="group"
      aria-label={t("label")}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={basePath}
          locale={code}
          className={clsx(
            "rounded-full px-2.5 py-1 transition",
            code === locale
              ? "bg-foreground text-background"
              : "hover:bg-border/60"
          )}
          aria-current={code === locale}
          prefetch={false}
        >
          {t(code)}
        </Link>
      ))}
    </div>
  );
}
