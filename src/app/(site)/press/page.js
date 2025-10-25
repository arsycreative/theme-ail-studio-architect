import Link from "next/link";
import Image from "next/image";
import { press } from "@/lib/data";

export const metadata = { title: "Press — AIL Studio" };

export default function PressPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold">Press</h1>
        <p className="text-muted-foreground max-w-2xl">
          Selected publications and features on our work and practice.
        </p>
      </header>

      <div className="rounded-2xl border border-border/70 divide-y divide-border/70 overflow-hidden">
        {press.map((it) => (
          <article
            key={it.slug}
            className="grid grid-cols-[64px_1fr_auto] gap-4 p-5 md:p-6"
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden border border-border/60">
              <Image
                src={it.logo}
                alt={`${it.name} logo`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="font-medium">{it.name}</h3>
              <p className="text-sm text-muted-foreground">{it.title}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{it.year}</span>
              <Link
                href={`/press/${it.slug}`}
                className="underline underline-offset-4"
              >
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
