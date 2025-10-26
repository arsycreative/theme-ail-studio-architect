"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export default function ProjectStarter() {
  const tStarter = useTranslations("home.projectStarter");
  const tCursor = useTranslations("common.cursor");
  const categories = useMemo(
    () => tStarter.raw("categories") ?? [],
    [tStarter]
  );
  const budgets = useMemo(() => tStarter.raw("budgets") ?? [], [tStarter]);
  const defaultCategory = categories[0] ?? "";
  const defaultBudget = budgets[1] ?? budgets[0] ?? "";

  const [cat, setCat] = useState(defaultCategory);
  const [bud, setBud] = useState(defaultBudget);
  const [city, setCity] = useState("");

  useEffect(() => {
    setCat((prev) => (categories.includes(prev) ? prev : defaultCategory));
  }, [categories, defaultCategory]);

  useEffect(() => {
    setBud((prev) => (budgets.includes(prev) ? prev : defaultBudget));
  }, [budgets, defaultBudget]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(
      tStarter("email.subject", { category: cat || defaultCategory || "-" })
    );
    const lines = [
      tStarter("email.category", { value: cat || "-" }),
      tStarter("email.budget", { value: bud || "-" }),
    ];
    if (city) {
      lines.push(tStarter("email.city", { value: city }));
    }
    lines.push("", tStarter("email.greeting"), tStarter("email.closing"));
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:studio@example.com?subject=${subject}&body=${body}`;
  }, [cat, bud, city, defaultCategory, tStarter]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {tStarter("title")}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {tStarter("description")}
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="text-sm text-muted-foreground">
              {tStarter("categoryLabel")}
            </label>
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
            <label className="text-sm text-muted-foreground">
              {tStarter("budgetLabel")}
            </label>
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
              {tStarter("cityLabel")}
            </label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={tStarter("cityPlaceholder")}
              className="mt-2 w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="mt-6">
          <a
            href={mailHref}
            className="underline underline-offset-4"
            data-cursor={tCursor("view")}
          >
            {tStarter("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
