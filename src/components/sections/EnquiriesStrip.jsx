"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function EnquiriesStrip() {
  const tStrip = useTranslations("home.enquiriesStrip");
  const tCursor = useTranslations("common.cursor");

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg md:text-xl font-medium">
            {tStrip("title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {tStrip("description")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 text-sm">
          <Link
            href="/contact"
            className="underline underline-offset-4"
            data-cursor={tCursor("view")}
          >
            {tStrip("contactForm")}
          </Link>
          <span className="hidden md:inline text-muted-foreground">/</span>
          <a
            href={`mailto:${tStrip("email")}`}
            className="underline underline-offset-4"
            data-cursor={tCursor("view")}
          >
            {tStrip("email")}
          </a>
          <span className="hidden md:inline text-muted-foreground">/</span>
          <a
            href={`tel:${tStrip("phone").replace(/\s+/g, "")}`}
            className="underline underline-offset-4"
            data-cursor={tCursor("view")}
          >
            {tStrip("phone")}
          </a>
        </div>
      </div>
    </section>
  );
}
