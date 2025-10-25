"use client";
import { useMemo } from "react";

export default function ProjectStats({ items = [] }) {
  const stats = useMemo(() => {
    const total = items.length;
    const years = items.map((p) => p.year).filter(Boolean);
    const minY = years.length ? Math.min(...years) : null;
    const maxY = years.length ? Math.max(...years) : null;

    const tagCount = new Map();
    items.forEach((p) =>
      (p.tags || []).forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1))
    );
    const popular =
      [...tagCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    return {
      total,
      span: minY && maxY ? `${minY}–${maxY}` : "—",
      popular,
    };
  }, [items]);

  return (
    <section className="mx-auto max-w-7xl px-6 pt-8">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/70 p-5">
          <div className="text-sm text-muted-foreground">Total Projects</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {stats.total}
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 p-5">
          <div className="text-sm text-muted-foreground">Active Years</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {stats.span}
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 p-5">
          <div className="text-sm text-muted-foreground">
            Most Frequent Category
          </div>
          <div className="text-xl md:text-2xl font-medium mt-1">
            {stats.popular}
          </div>
        </div>
      </div>
    </section>
  );
}
