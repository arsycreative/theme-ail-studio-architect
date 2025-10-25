"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import ProjectsGallery from "@/components/projects/ProjectsGallery";

// NEW
import FeaturedProjectsBand from "@/components/projects/FeaturedProjectsBand";
import ProjectStats from "@/components/projects/ProjectStats";

export default function ProjectsExplorer() {
  const allTags = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [density, setDensity] = useState("Comfort");

  const filtered = useMemo(() => {
    let list = [...projects];
    if (tag !== "All") list = list.filter((p) => p.tags?.includes(tag));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "Newest") list.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sort === "Oldest") list.sort((a, b) => (a.year || 0) - (b.year || 0));
    return list;
  }, [query, tag, sort]);

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2" data-reveal-up>
          Projects
        </h1>
        <p className="text-muted-foreground max-w-2xl" data-reveal-up>
          A curation of residential and commercial works across regions.
        </p>
      </section>

      {/* NEW: highlight + kredibilitas + lokasi */}
      <FeaturedProjectsBand items={projects.slice(0, 3)} />
      <ProjectStats items={projects} />

      {/* Toolbar sticky */}
      <section className="sticky top-16 z-30 mx-auto max-w-7xl px-6 py-4">
        <div className="rounded-2xl border border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[220px]">
              <label htmlFor="q" className="sr-only">
                Search
              </label>
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tag, or location"
                className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Tag filter */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTag("All")}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  tag === "All"
                    ? "border-foreground"
                    : "border-border/70 hover:border-border"
                }`}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    tag === t
                      ? "border-foreground"
                      : "border-border/70 hover:border-border"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Showing <span className="text-foreground">{filtered.length}</span>{" "}
            of {projects.length} projects
            {tag !== "All" ? ` • ${tag}` : ""}
            {query ? " • filtered" : ""}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <ProjectsGallery items={filtered} density={density} />
    </>
  );
}
