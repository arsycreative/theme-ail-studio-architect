"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Workspace",
  "F&B",
];
const budgets = ["< IDR 1M", "IDR 1–5M", "IDR 5–10M", "> IDR 10M"];

export default function ProjectStarter() {
  const [cat, setCat] = useState("Residential");
  const [bud, setBud] = useState("IDR 1–5M");
  const [city, setCity] = useState("");

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(`New Project Enquiry — ${cat}`);
    const body = encodeURIComponent(
      [
        `Category: ${cat}`,
        `Budget: ${bud}`,
        `City: ${city || "-"}`,
        "",
        "Hello AIL Studio,",
        "I'd like to discuss a new project. Please get in touch.",
      ].join("\n")
    );
    return `mailto:studio@example.com?subject=${subject}&body=${body}`;
  }, [cat, bud, city]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Start a Project</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Tell us a little about your project to get the conversation started.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="text-sm text-muted-foreground">Category</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    c === cat
                      ? "border-foreground"
                      : "border-border/70 hover:border-border"
                  }`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm text-muted-foreground">Budget</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    b === bud
                      ? "border-foreground"
                      : "border-border/70 hover:border-border"
                  }`}
                  onClick={() => setBud(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="text-sm text-muted-foreground">
              City (optional)
            </label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Jakarta / Singapore / …"
              className="mt-2 w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={mailHref}
            className="underline underline-offset-4"
            data-cursor="View"
          >
            Start Brief →
          </Link>
        </div>
      </div>
    </section>
  );
}
