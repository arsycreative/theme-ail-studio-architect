import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getPress } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "home.pressPage",
  });
  return { title: t("metaTitle"), description: t("description") };
}

export default async function PressPage({ params }) {
  const { locale } = await params;
  const items = getPress(locale);
  const tPress = await getTranslations("home.pressPage");
  const tCursor = await getTranslations("common.cursor");

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold">
          {tPress("title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {tPress("description")}
        </p>
      </header>

      <div className="rounded-2xl border border-border/70 divide-y divide-border/70 overflow-hidden">
        {items.map((entry) => (
          <article
            key={entry.slug}
            className="grid grid-cols-[64px_1fr_auto] gap-4 p-5 md:p-6"
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden border border-border/60">
              <Image
                src={entry.logo}
                alt={`${entry.name} logo`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="font-medium">{entry.name}</h3>
              <p className="text-sm text-muted-foreground">{entry.title}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{entry.year}</span>
              <Link
                href={`/press/${entry.slug}`}
                className="underline underline-offset-4"
                data-cursor={tCursor("view")}
              >
                {tPress("details")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
