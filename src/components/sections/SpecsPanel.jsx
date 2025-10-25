"use client";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SpecsPanel({ specs = [] }) {
  const [open, setOpen] = useState(false);

  if (!specs?.length) return null;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-2xl border border-border/70"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Specifications</h2>
          <CollapsibleTrigger
            className="text-sm underline underline-offset-4"
            aria-label={open ? "Hide specifications" : "Show specifications"}
          >
            {open ? "Hide" : "Show"}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {specs.map((s) => (
              <div key={s.label} className="contents">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
