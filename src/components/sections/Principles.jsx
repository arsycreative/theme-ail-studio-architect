"use client";
import { Badge } from "@/components/ui/badge";

const blocks = [
  {
    t: "Proportion",
    d: "Measured compositions with quiet tension and calm rhythms.",
  },
  {
    t: "Materiality",
    d: "Noble, tactile finishes with durable patina and restraint.",
  },
  {
    t: "Light",
    d: "Soft gradients and precise apertures that shape atmospheres.",
  },
];

export default function Principles() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Design Principles
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          We pursue serene spaces through studied proportion, honest materials,
          and nuanced light.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {blocks.map((b) => (
          <div
            key={b.t}
            className="rounded-2xl border border-border/70 p-6 space-y-3 hover:bg-muted/30 transition"
          >
            <Badge variant="secondary">{b.t}</Badge>
            <p className="text-sm text-muted-foreground">{b.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
