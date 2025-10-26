"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function AwardsStrip() {
  const tAwards = useTranslations("home.awardsStrip");
  const items = useMemo(() => tAwards.raw("items") ?? [], [tAwards]);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-muted-foreground">
        {items.map((i) => (
          <div
            key={i}
            className="border border-dashed border-border/60 rounded-xl p-6 text-center"
          >
            <span className="text-sm">{i}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
