"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

export default function FeaturedProjectsBand({ items = [] }) {
  const ref = useRef(null);
  const tCursor = useTranslations("common.cursor");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-fpb]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const [a, b, c] = items;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 pt-8">
      <div className="grid md:grid-cols-3 gap-4">
        {/* besar kiri */}
        {a && (
          <article
            data-fpb
            className="relative md:col-span-2 rounded-2xl overflow-hidden border border-border/70"
          >
            <div className="relative aspect-[16/8.5]">
              <Image
                src={a.cover}
                alt={a.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background/80 to-transparent">
              <h3 className="text-xl font-medium">
                <Link
                  href={`/case-studies/${a.slug}`}
                  className="underline-offset-4 hover:underline"
                  data-cursor={tCursor("view")}
                >
                  {a.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                {a.location} • {a.year}
              </p>
            </div>
          </article>
        )}
        {/* dua kecil kanan */}
        <div className="grid gap-4">
          {b && (
            <article
              data-fpb
              className="relative rounded-2xl overflow-hidden border border-border/70"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={b.cover}
                  alt={b.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h4 className="font-medium">
                  <Link
                    href={`/case-studies/${b.slug}`}
                    className="underline-offset-4 hover:underline"
                    data-cursor={tCursor("view")}
                  >
                    {b.title}
                  </Link>
                </h4>
                <span className="text-xs text-muted-foreground">
                  {b.location} • {b.year}
                </span>
              </div>
            </article>
          )}
          {c && (
            <article
              data-fpb
              className="relative rounded-2xl overflow-hidden border border-border/70"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={c.cover}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h4 className="font-medium">
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="underline-offset-4 hover:underline"
                    data-cursor={tCursor("view")}
                  >
                    {c.title}
                  </Link>
                </h4>
                <span className="text-xs text-muted-foreground">
                  {c.location} • {c.year}
                </span>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
