"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export default function JournalTeaser() {
  const ref = useRef(null);
  const locale = useLocale();
  const posts = getPosts(locale);
  const tJournal = useTranslations("home.journalTeaser");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-article]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.05,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {tJournal("title")}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {tJournal("description")}
          </p>
        </div>
        <Link href="/about" className="text-sm underline underline-offset-4">
          {tJournal("ctaAbout")}
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article
            key={p.slug}
            data-article
            className="rounded-2xl overflow-hidden border border-border/70"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="p-5 space-y-2">
              <Badge variant="secondary">{p.tag}</Badge>
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              <Link href={`/`} className="text-sm underline underline-offset-4">
                {tJournal("ctaRead")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
