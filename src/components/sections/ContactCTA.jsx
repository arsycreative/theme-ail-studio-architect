"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ContactCTA() {
  const tCTA = useTranslations("home.contactCTA");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/70">
        {/* bg image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/project-thebrash-2.webp"
            alt="Material detail"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
        </div>

        {/* content */}
        <div className="relative p-8 md:p-12 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {tCTA("title")}
          </h2>
          <p className="text-muted-foreground mt-2">
            {tCTA("description")}
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/contact">{tCTA("primary")}</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-xl">
              <Link href="/projects">{tCTA("secondary")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
