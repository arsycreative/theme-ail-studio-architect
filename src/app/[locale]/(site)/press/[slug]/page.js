import Image from "next/image";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import { getPress } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPress(locale).map((entry) => ({
      locale,
      slug: entry.slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const entry = getPress(locale).find((item) => item.slug === slug);
  if (!entry) return {};

  const title = `${entry.name} — ${entry.title}`;
  const description = `${entry.name} (${entry.year}) — ${entry.title}`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function PressDetailPage({ params }) {
  const { locale, slug } = await params;
  const entry = getPress(locale).find((item) => item.slug === slug);
  if (!entry) return notFound();

  const tDetail = await getTranslations("home.pressDetail");
  const tCursor = await getTranslations("common.cursor");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <header className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-md overflow-hidden border border-border/60">
          <Image
            src={entry.logo}
            alt={`${entry.name} logo`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{entry.name}</h1>
          <p className="text-sm text-muted-foreground">
            {entry.year} • {tDetail("featureLabel")}
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="font-medium">{entry.title}</h2>
        <p className="text-muted-foreground">{tDetail("summary")}</p>
        <div className="pt-2">
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            data-cursor={tCursor("view")}
          >
            {tDetail("read", { name: entry.name })}
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-border/70 p-5">
        <h3 className="font-medium">{tDetail("creditsTitle")}</h3>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          <dt className="text-muted-foreground">
            {tDetail("credits.publication")}
          </dt>
          <dd>{entry.name}</dd>
          <dt className="text-muted-foreground">
            {tDetail("credits.year")}
          </dt>
          <dd>{entry.year}</dd>
          <dt className="text-muted-foreground">
            {tDetail("credits.type")}
          </dt>
          <dd>{tDetail("credits.typeValue")}</dd>
          <dt className="text-muted-foreground">
            {tDetail("credits.link")}
          </dt>
          <dd>
            <a
              href={entry.url}
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={tCursor("view")}
            >
              {tDetail("credits.external")}
            </a>
          </dd>
        </dl>
      </section>
    </article>
  );
}
