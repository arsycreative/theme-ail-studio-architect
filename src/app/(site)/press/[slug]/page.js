import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { press } from "@/lib/data";

export async function generateStaticParams() {
  return press.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const it = press.find((x) => x.slug === params.slug);
  if (!it) return {};
  const title = `${it.name} — ${it.title}`;
  return {
    title,
    description: `${it.name} (${it.year}) — ${it.title}`,
    openGraph: { title, description: `${it.name} • ${it.year}` },
    twitter: { card: "summary", title },
  };
}

export default function PressDetailPage({ params }) {
  const it = press.find((x) => x.slug === params.slug);
  if (!it) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <header className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-md overflow-hidden border border-border/60">
          <Image
            src={it.logo}
            alt={`${it.name} logo`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{it.name}</h1>
          <p className="text-sm text-muted-foreground">{it.year} • Feature</p>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="font-medium">{it.title}</h2>
        <p className="text-muted-foreground">
          Coverage on our approach to proportion, materiality, and light across
          residential work.
        </p>
        <div className="pt-2">
          <Link
            href={it.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            data-cursor="View"
          >
            Read on {it.name}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 p-5">
        <h3 className="font-medium">Credits</h3>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Publication</dt>
          <dd>{it.name}</dd>
          <dt className="text-muted-foreground">Year</dt>
          <dd>{it.year}</dd>
          <dt className="text-muted-foreground">Type</dt>
          <dd>Feature</dd>
          <dt className="text-muted-foreground">Link</dt>
          <dd>
            <Link href={it.url} className="underline underline-offset-4">
              External
            </Link>
          </dd>
        </dl>
      </section>
    </article>
  );
}
