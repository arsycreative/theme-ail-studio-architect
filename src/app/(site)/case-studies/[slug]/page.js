// src/app/case-studies/[slug]/page.js
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import SpecsPanel from "@/components/sections/SpecsPanel";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import ChapterGallery from "@/components/sections/ChapterGallery";

// Generate static params untuk SSG
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Metadata per-project (App Router)
export async function generateMetadata({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  const title = `${p.title} — AIL Studio`;
  const description = `${p.title} in ${p.location} • ${p.year}.`;
  const og = p.cover
    ? [{ url: p.cover, width: 1200, height: 630, alt: p.title }]
    : [];
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: og },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: og?.[0]?.url,
    },
  };
}

export default function CaseStudyPage({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <article className="relative">
      {/* Header sinematik */}
      <section className="relative min-h-[70svh]">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-10 flex items-end h-full">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-semibold">{p.title}</h1>
            <p className="text-muted-foreground">
              {p.location} • {p.year}
            </p>
          </div>
        </div>
      </section>

      {/* Body: Sticky info + Chapters + Before/After */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-[320px_1fr] gap-8">
        {/* Sidebar (sticky) */}
        <aside className="md:sticky md:top-24 self-start space-y-4 h-max">
          <div className="rounded-2xl border border-border/70 p-5">
            <h2 className="font-medium">Project Info</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Location</dt>
              <dd>{p.location}</dd>
              <dt className="text-muted-foreground">Year</dt>
              <dd>{p.year}</dd>
              <dt className="text-muted-foreground">Type</dt>
              <dd>{p.tags.join(", ")}</dd>
              <dt className="text-muted-foreground">Role</dt>
              <dd>Architecture and Interiors</dd>
            </dl>
          </div>

          {/* Specs Panel (expandable) */}
          <SpecsPanel specs={p.specs} />
        </aside>

        {/* Chapters + Gallery + Before/After */}
        <div className="space-y-16">
          {p.chapters?.map((c) => (
            <section key={c.key} className="space-y-4">
              <header>
                <h3 className="text-xl md:text-2xl font-medium">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.prose}</p>
              </header>

              {/* Chapter hero image */}
              <div className="relative rounded-2xl overflow-hidden border border-border/70">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    data-lightbox="true"
                  />
                </div>
              </div>

              {/* Chapter gallery (portrait/landscape mix) */}
              {Array.isArray(c.gallery) && c.gallery.length > 0 && (
                <div className="pt-2">
                  <ChapterGallery items={c.gallery} />
                </div>
              )}
            </section>
          ))}

          {/* Before / After (opsional per project) */}
          {p.beforeAfter?.before && p.beforeAfter?.after && (
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium">
                Before / After
              </h3>
              <BeforeAfterSlider
                before={p.beforeAfter.before}
                after={p.beforeAfter.after}
                aspect="16/9"
              />
            </section>
          )}
        </div>
      </section>
    </article>
  );
}
