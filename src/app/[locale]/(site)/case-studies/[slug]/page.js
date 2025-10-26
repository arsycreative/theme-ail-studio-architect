import Image from "next/image";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import {
  getProjectBySlug,
  getProjects,
} from "@/lib/data";
import SpecsPanel from "@/components/sections/SpecsPanel";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import ChapterGallery from "@/components/sections/ChapterGallery";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug) || getProjectBySlug("en", slug);
  if (!project) return {};

  const t = await getTranslations({
    locale,
    namespace: "home.caseStudy",
  });

  const title = t("metaTitle", { title: project.title });
  const description = t("metaDescription", {
    title: project.title,
    location: project.location,
    year: project.year,
  });
  const og = project.cover
    ? [{ url: project.cover, width: 1200, height: 630, alt: project.title }]
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

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  if (!project) return notFound();

  const tCaseStudy = await getTranslations("home.caseStudy");

  return (
    <article className="relative">
      <section className="relative min-h-[70svh]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-10 flex items-end h-full">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-semibold">
              {project.title}
            </h1>
            <p className="text-muted-foreground">
              {project.location} • {project.year}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-[320px_1fr] gap-8">
        <aside className="md:sticky md:top-24 self-start space-y-4 h-max">
          <div className="rounded-2xl border border-border/70 p-5">
            <h2 className="font-medium">{tCaseStudy("projectInfo")}</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <dt className="text-muted-foreground">
                {tCaseStudy("labels.location")}
              </dt>
              <dd>{project.location}</dd>
              <dt className="text-muted-foreground">
                {tCaseStudy("labels.year")}
              </dt>
              <dd>{project.year}</dd>
              <dt className="text-muted-foreground">
                {tCaseStudy("labels.type")}
              </dt>
              <dd>{project.tags.join(", ")}</dd>
              <dt className="text-muted-foreground">
                {tCaseStudy("labels.role")}
              </dt>
              <dd>{tCaseStudy("roleValue")}</dd>
            </dl>
          </div>

          <SpecsPanel specs={project.specs} />
        </aside>

        <div className="space-y-16">
          {project.chapters?.map((chapter) => (
            <section key={chapter.key} className="space-y-4">
              <header>
                <h3 className="text-xl md:text-2xl font-medium">
                  {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {chapter.prose}
                </p>
              </header>

              <div className="relative rounded-2xl overflow-hidden border border-border/70">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={chapter.image}
                    alt={chapter.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    data-lightbox="true"
                  />
                </div>
              </div>

              {Array.isArray(chapter.gallery) && chapter.gallery.length > 0 && (
                <div className="pt-2">
                  <ChapterGallery items={chapter.gallery} />
                </div>
              )}
            </section>
          ))}

          {project.beforeAfter?.before && project.beforeAfter?.after && (
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium">
                {tCaseStudy("beforeAfter")}
              </h3>
              <BeforeAfterSlider
                before={project.beforeAfter.before}
                after={project.beforeAfter.after}
                aspect="16/9"
              />
            </section>
          )}
        </div>
      </section>
    </article>
  );
}
