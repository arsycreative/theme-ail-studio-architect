import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studio" });
  return { title: t("metadataTitle") };
}

export default async function StudioPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studio" });

  const hero = t.raw("hero");
  const principles = t.raw("principles");
  const numbers = t.raw("numbers");
  const capabilities = t.raw("capabilities");
  const timeline = t.raw("timeline");
  const gallery = t.raw("gallery");
  const careers = t.raw("careers");

  const [heroImagePrimary, heroImageSecondary] = hero.images ?? [];
  const [heroPanel, entryPanel, deskPanel, materialsPanel, meetingPanel] =
    gallery.items ?? [];

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-16 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold" data-reveal-up>
            {hero.title}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl" data-reveal-up>
            {hero.description}
          </p>
        </div>

        {/* Duo images */}
        <div className="grid md:grid-cols-2 gap-6">
          <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={
                heroImagePrimary?.src ??
                "https://images.unsplash.com/photo-1606744888344-493238951221?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548"
              }
              alt={heroImagePrimary?.alt ?? "Studio process"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              data-lightbox="true"
            />
          </figure>
          <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={
                heroImageSecondary?.src ??
                "https://images.unsplash.com/photo-1512972972907-6d71529c5e92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742"
              }
              alt={heroImageSecondary?.alt ?? "Material board"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              data-lightbox="true"
            />
          </figure>
        </div>
      </section>

      <Separator />

      {/* Principles + Numbers */}
      <section className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-[1fr_420px] gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {principles.title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {principles.description}
          </p>
          <ul className="mt-4 grid gap-2">
            {principles.approach?.map((a) => (
              <li key={a} className="flex gap-3 text-sm">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-foreground/80" />
                <span className="text-muted-foreground">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-border/70 p-5 h-max">
          <h3 className="font-medium">{t("numbersHeading")}</h3>
          <dl className="mt-3 grid grid-cols-1 gap-3 text-sm">
            {numbers.map((n) => (
              <div
                key={n.label}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2"
              >
                <dt className="text-muted-foreground">{n.label}</dt>
                <dd className="font-medium">{n.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-2xl border border-border/70 p-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {capabilities.title}
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {capabilities.items?.map((c) => (
              <div key={c.category} className="space-y-3">
                <h3 className="font-medium">{c.category}</h3>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-2 h-px w-4 bg-border" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          {timeline.title}
        </h2>
        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/80"
            aria-hidden
          />
          <div className="space-y-8">
            {timeline.items?.map((m, i) => (
              <div
                key={m.year}
                className={`relative grid md:grid-cols-2 gap-6 ${
                  i % 2 ? "md:text-left" : "md:text-right"
                }`}
              >
                <div className={`${i % 2 ? "md:order-2" : "md:order-1"}`}>
                  <div className="inline-flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {m.year}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/90" />
                  </div>
                  <h3 className="text-lg font-medium mt-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-prose">
                    {m.text}
                  </p>
                </div>
                <div className={`${i % 2 ? "md:order-1" : "md:order-2"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER GALLERY — layout mahal */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {gallery.title}
          </h2>
          <span className="text-xs text-muted-foreground">
            {gallery.locations}
          </span>
        </div>

        {/* Kolase editorial (12 kolom, tanpa row-span berlebihan) */}
        <div className="grid grid-cols-12 gap-4">
          {/* Panel hero lebar */}
          <figure className="relative col-span-12 rounded-2xl overflow-hidden border border-border/70 aspect-[21/9]">
            <Image
              src={heroPanel?.src}
              alt={heroPanel?.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 90vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
              <div className="backdrop-blur-[2px] bg-background/40 border border-border/60 rounded-full px-3 py-1">
                <span className="text-xs">{heroPanel?.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {heroPanel?.meta}
              </span>
            </figcaption>
          </figure>

          {/* Triptych: 1 besar portret + 2 panel landscape/portret */}
          <figure className="relative col-span-12 md:col-span-5 xl:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={entryPanel?.src}
              alt={entryPanel?.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 33vw, (min-width:768px) 40vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {entryPanel?.title}
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-7 xl:col-span-8 aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={deskPanel?.src}
              alt={deskPanel?.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 58vw, (min-width:768px) 60vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute right-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {deskPanel?.title}
            </figcaption>
          </figure>

          {/* Bottom strip: dua panel kecil simetris */}
          <figure className="relative col-span-12 md:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={materialsPanel?.src}
              alt={materialsPanel?.title}
              fill
              className="object-cover"
              sizes="(min-width:768px) 50vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {materialsPanel?.title}
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-6 aspect-[3/4] md:aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={meetingPanel?.src}
              alt={meetingPanel?.title}
              fill
              className="object-cover"
              sizes="(min-width:768px) 50vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute right-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {meetingPanel?.title}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Careers & Contact */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-border/70 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {careers.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              {careers.description}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`mailto:studio@example.com?subject=${encodeURIComponent(
                careers.emailSubject
              )}`}
              className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
            >
              {careers.emailLabel}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
            >
              {careers.contactLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
