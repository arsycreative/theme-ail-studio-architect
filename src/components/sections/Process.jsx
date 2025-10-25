"use client";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    k: "01",
    t: "Discovery",
    d: "Brief, site reading, constraints and potential mapping.",
  },
  {
    k: "02",
    t: "Concept",
    d: "Spatial narrative, massing, and palette choreography.",
  },
  {
    k: "03",
    t: "Detailing",
    d: "Joinery, junctions, lighting, and performance specs.",
  },
  {
    k: "04",
    t: "Delivery",
    d: "Documentation, coordination, site review, handover.",
  },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">Process</h2>
      <div className="rounded-2xl border border-border/70 divide-y divide-border/70 overflow-hidden">
        {steps.map((s, i) => (
          <div key={s.k} className="grid md:grid-cols-[120px_1fr]">
            <div className="p-6 md:p-8 text-muted-foreground">{s.k}</div>
            <div className="p-6 md:p-8">
              <h3 className="font-medium">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="mt-8" />
      <p className="text-sm text-muted-foreground mt-4">
        Each phase is iterative, documented, and coordinated closely with
        clients and makers.
      </p>
    </section>
  );
}
