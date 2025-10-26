"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, Flip } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { getProjects } from "@/lib/data";
import ProjectMediaCarousel from "./ProjectMediaCarousel";
import { useLocale, useTranslations } from "next-intl";

export default function ProjectGrid() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const locale = useLocale();
  const projectList = getProjects(locale);
  const tCommon = useTranslations("common");
  const tProjectGrid = useTranslations("home.projectGrid");

  // reveal on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.05 + i * 0.06,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // FLIP animation when opening dialog
  const onOpen = (p) => {
    const state = Flip.getState(`[data-flip-id="project-${p.slug}-image"]`);
    setCurrent(p);
    setOpen(true);
    // wait next paint for dialog to mount target
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        absolute: true,
      });
    });
  };

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {tProjectGrid("title")}
        </h2>
        <Link
          href="/projects"
          className="text-sm underline-offset-4 hover:underline"
        >
          {tCommon("cta.viewAll")}
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projectList.map((p) => (
          <div
            key={p.slug}
            className="project-card group relative rounded-2xl overflow-hidden border border-border/70"
          >
            <div className="relative aspect-[4/5]">
              {/* shared flip id on card image */}
              <div
                data-flip-id={`project-${p.slug}-image`}
                className="absolute inset-0"
              >
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div
                className="absolute inset-0 bg-black/0 transition duration-500 pointer-events-none will-change-transform transform-gpu group-hover:bg-black/20 group-hover:scale-[1.04]"
                style={{ transformOrigin: "center" }}
              />
              <div className="absolute bottom-3 right-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg"
                  onClick={() => onOpen(p)}
                  data-cursor={tCommon("cta.quickView")}
                >
                  {tCommon("cta.quickView")}
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {p.tags.map((t) => (
                  <Badge variant="secondary" key={t}>
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{p.title}</h3>
                <span className="text-sm text-muted-foreground">{p.year}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Quick View */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
      w-[96vw] lg:w-[94vw] xl:w-[90vw]
      max-w-[1800px] h-[90vh]
      p-0 overflow-hidden rounded-3xl
      border border-border/70 bg-background/95 shadow-2xl
    "
        >
          {current && (
            <div
              className="
          h-full
          grid
          md:grid-cols-[65%_35%]
          lg:grid-cols-[68%_32%]
          xl:grid-cols-[70%_30%]
        "
            >
              {/* Kiri: media */}
              <div className="p-4 md:p-6 flex flex-col h-full min-w-0">
                {/* anchor FLIP (tetap) */}
                <div className="relative">
                  <div
                    data-flip-id={`project-${current.slug}-image`}
                    className="absolute inset-0 -z-10 pointer-events-none"
                  />
                </div>

                {/* wrapper flex agar carousel isi penuh */}
                <div className="flex-1 min-h-0 min-w-0">
                  <ProjectMediaCarousel
                    images={current.images || [current.cover]}
                    slug={current.slug}
                  />
                </div>
              </div>

              {/* Kanan: info */}
              <div className="p-6 md:p-8 space-y-4 overflow-y-auto min-w-0">
                <DialogTitle className="text-2xl md:text-3xl">
                  {current.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {current.location} • {current.year}
                </DialogDescription>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tProjectGrid("dialogDescription")}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {current.tags?.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 flex gap-3">
                  <Link
                    href={`/case-studies/${current.slug}`}
                    className="underline underline-offset-4"
                    data-cursor={tCommon("cta.openCaseStudy")}
                  >
                    {tCommon("cta.openCaseStudy")}
                  </Link>
                  <span className="text-muted-foreground">/</span>
                  <Link
                    href="/contact"
                    className="underline underline-offset-4"
                    data-cursor={tCommon("cta.contact")}
                  >
                    {tCommon("cta.startProject")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
