"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Link } from "@/i18n/routing";
import { getProjects } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";

export default function FeaturedCaseStudy() {
  const ref = useRef(null);
  const locale = useLocale();
  const tHome = useTranslations("home.featuredCaseStudy");
  const tCommon = useTranslations("common");
  const project = getProjects(locale)[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fc-reveal]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!project) return null;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold" data-fc-reveal>
          {tHome("title")}
        </h2>
        <p className="text-muted-foreground" data-fc-reveal>
          {tHome("intro")}
        </p>
      </header>

      <div className="grid md:grid-cols-[70%_30%] gap-6">
        <div
          className="relative rounded-2xl overflow-hidden border border-border/70 aspect-[16/9]"
          data-fc-reveal
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority={false}
            data-lightbox="true"
          />
        </div>
        <aside
          className="rounded-2xl border border-border/70 p-6 flex flex-col"
          data-fc-reveal
        >
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-medium">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.location} • {project.year}
            </p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {tHome("summary")}
          </p>
          <div className="mt-auto pt-6">
            <Link
              href={`/case-studies/${project.slug}`}
              className="underline underline-offset-4"
              data-cursor={tCommon("cta.openCaseStudy")}
            >
              {tCommon("cta.openCaseStudy")} →
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
