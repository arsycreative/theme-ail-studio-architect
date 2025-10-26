"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export default function Process() {
  const tProcess = useTranslations("home.process");
  const steps = useMemo(
    () => tProcess.raw("steps") ?? [],
    [tProcess]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        {tProcess("title")}
      </h2>
      <div className="rounded-2xl border border-border/70 divide-y divide-border/70 overflow-hidden">
        {steps.map((s, i) => (
          <div key={s.key} className="grid md:grid-cols-[120px_1fr]">
            <div className="p-6 md:p-8 text-muted-foreground">{s.key}</div>
            <div className="p-6 md:p-8">
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="mt-8" />
      <p className="text-sm text-muted-foreground mt-4">
        {tProcess("summary")}
      </p>
    </section>
  );
}
