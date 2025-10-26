"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export default function Principles() {
  const tPrinciples = useTranslations("home.principles");
  const items = useMemo(
    () => tPrinciples.raw("items") ?? [],
    [tPrinciples]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {tPrinciples("title")}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {tPrinciples("description")}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-border/70 p-6 space-y-3 hover:bg-muted/30 transition"
          >
            <Badge variant="secondary">{b.title}</Badge>
            <p className="text-sm text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
