import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import AboutMotion from "@/components/animations/AboutMotion";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metadataTitle") };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const hero = t.raw("hero");
  const manifesto = t.raw("manifesto");
  const directors = t.raw("directors.items");
  const directorsTitle = t("directors.title");
  const directorsSubtitle = t("directors.subtitle");
  const pillars = t.raw("pillars.items");
  const pillarsTitle = t("pillars.title");
  const approach = t.raw("approach");
  const accolades = t.raw("accolades");
  const publications = t.raw("publications");
  const clients = t.raw("clients.items");
  const clientsTitle = t("clients.title");
  const timeline = t.raw("timeline");
  const quote = t.raw("quote");
  const cta = t.raw("cta");

  const gallery = t.raw("gallery");
  const [heroPanel, entryPanel, deskPanel, materialsPanel, meetingPanel] =
    gallery.items;

  return (
    <>
      {/* HERO — Portrait editorial */}
      <section
        className="about-hero relative isolate overflow-clip"
        data-reveal-fade
      >
        <div className="absolute inset-0">
          <Image
            src={
              hero.image ??
              "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
            }
            alt={hero.imageAlt}
            fill
            className="about-hero-img object-cover"
            sizes="100vw"
            priority
            data-lightbox="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--background) 22%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              // grid: horizontal + vertical
              backgroundImage:
                "linear-gradient(transparent 95%, rgba(0,0,0,0.06) 96%), linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.06) 96%)",
              backgroundSize: "100% 48px, 48px 100%",
              // --- Fade di bagian bawah (mask) ---
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-[2px] px-3 py-1 text-xs text-muted-foreground"
            data-reveal-up
          >
            {hero.eyebrow}
          </div>
          <h1
            className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl"
            data-reveal-up
          >
            {hero.title}
          </h1>
          <p
            className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl"
            data-reveal-up
          >
            {hero.description}
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-7xl px-6 py-14" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_420px] gap-8 items-start">
            <div className="space-y-4" data-stagger>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {manifesto.title}
              </h2>
              {manifesto.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm text-muted-foreground max-w-prose"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/70"
              data-parallax-y="-8"
            >
              <Image
                src={
                  manifesto.image ?? "https://images.unsplash.com/photo-1693578616322-c8abe6c7393d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
                }
                alt={manifesto.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 40vw, 100vw"
                data-lightbox="true"
              />
            </figure>
          </div>
        </div>
      </section>

      <Separator />

      {/* DIRECTORS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold" data-reveal-up>
            {directorsTitle}
          </h2>
          <p className="text-sm text-muted-foreground" data-reveal-up>
            {directorsSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6" data-stagger>
          {directors.map((d) => (
            <article
              key={d.name}
              className="rounded-2xl overflow-hidden border border-border/70"
              data-reveal-fade
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-medium">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.role}</p>
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {d.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-6" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{pillarsTitle}</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6" data-stagger>
            {pillars.map((p) => (
              <div key={p.title} className="space-y-2">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH / PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold" data-reveal-up>
            {approach.title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl" data-reveal-up>
            {approach.description}
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-4" data-stagger>
          {approach.steps?.map((s) => (
            <div key={s.key} className="rounded-2xl border border-border/70 p-4">
              <div className="text-xs text-muted-foreground">{s.key}</div>
              <h3 className="mt-1 font-medium">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCOLADES & PUBLICATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-6" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div data-stagger>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {accolades.title}
              </h2>
              <ul className="mt-4 grid gap-3">
                {accolades.items?.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" data-reveal-up>
                {publications.title}
              </h2>
              <div
                className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
                data-stagger
              >
                {publications.items?.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    className="group relative rounded-xl border border-border/70 overflow-hidden"
                    aria-label={p.name}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={p.logo}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="200px"
                      />

                      {/* scrim halus di bawah */}
                      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    </div>

                    {/* caption minimalis */}
                    <div className="absolute inset-x-0 bottom-1 px-2">
                      <div className="inline-flex items-center rounded-full bg-black/45 backdrop-blur-[2px] px-2.5 py-[2px] border border-white/15">
                        <span className="text-[9.5px] tracking-wide text-white/95 font-medium leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                          {p.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-14" data-reveal-up>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          {clientsTitle}
        </h2>
        <div className="rounded-2xl border border-border/70 p-4">
          <div className="flex flex-wrap gap-2" data-stagger>
            {clients.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE (CONDENSED) */}
      <section className="mx-auto max-w-7xl px-6 py-6" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {timeline.title}
          </h2>
          <div className="mt-4 relative">
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/80" />
            <div className="space-y-8" data-stagger>
              {timeline.items?.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative grid md:grid-cols-2 gap-6 ${
                    i % 2 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <div className={`${i % 2 ? "md:order-2" : "md:order-1"}`}>
                    <div className="inline-flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {t.year}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-foreground/90" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.text}
                    </p>
                  </div>
                  <div className={`${i % 2 ? "md:order-1" : "md:order-2"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / QUOTE */}
      <section className="mx-auto max-w-7xl px-6 py-14" data-parallax-y="-6">
        <figure className="rounded-2xl border border-border/70 p-8 md:p-12 bg-background">
          <blockquote className="text-xl md:text-2xl leading-relaxed">
            {quote.text}
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            {quote.attribution}
          </figcaption>
        </figure>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20" data-reveal-up>
        <div className="relative overflow-hidden rounded-3xl border border-border/70">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c"
              alt="Material detail"
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
          </div>
          <div className="relative p-8 md:p-12 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {cta.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {cta.description}
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/contact"
                className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
              >
                {cta.contactLabel}
              </Link>
              <Link
                href={`mailto:studio@example.com?subject=${encodeURIComponent(cta.emailSubject)}`}
                className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
              >
                {cta.emailLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {gallery.title}
          </h2>
          <span className="text-xs text-muted-foreground">
            {gallery.locations}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <figure className="relative col-span-12 rounded-2xl overflow-hidden border border-border/70 aspect-[21/9]">
            <Image
              src={heroPanel.src}
              alt={heroPanel.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 90vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
              <div className="backdrop-blur-[2px] bg-background/40 border border-border/60 rounded-full px-3 py-1">
                <span className="text-xs">{heroPanel.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {heroPanel.meta}
              </span>
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-5 xl:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={entryPanel.src}
              alt={entryPanel.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 33vw, (min-width:768px) 40vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {entryPanel.title}
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-7 xl:col-span-8 aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={deskPanel.src}
              alt={deskPanel.title}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 58vw, (min-width:768px) 60vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute right-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {deskPanel.title}
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={materialsPanel.src}
              alt={materialsPanel.title}
              fill
              className="object-cover"
              sizes="(min-width:768px) 50vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute left-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {materialsPanel.title}
            </figcaption>
          </figure>

          <figure className="relative col-span-12 md:col-span-6 aspect-[3/4] md:aspect-[16/10] rounded-2xl overflow-hidden border border-border/70">
            <Image
              src={meetingPanel.src}
              alt={meetingPanel.title}
              fill
              className="object-cover"
              sizes="(min-width:768px) 50vw, 100vw"
              data-lightbox="true"
            />
            <figcaption className="absolute right-3 bottom-3 rounded-full border border-border/60 bg-background/40 backdrop-blur px-3 py-1 text-xs">
              {meetingPanel.title}
            </figcaption>
          </figure>
        </div>
      </section>

      <AboutMotion />
    </>
  );
}
