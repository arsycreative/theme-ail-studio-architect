// src/app/about/page.js
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AboutMotion from "@/components/animations/AboutMotion";

export const metadata = { title: "About — AIL Studio" };

// Data (tetap sama)
const directors = [
  {
    name: "A. Wirawan",
    role: "Principal Architect",
    img: "https://images.unsplash.com/photo-1620668233692-c83e9563f337?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    bio: "Leads architectural vision with emphasis on disciplined proportion, daylight, and serviceable details.",
  },
  {
    name: "N. Prameswari",
    role: "Design Director, Interiors",
    img: "https://images.unsplash.com/photo-1738739907559-8998f9e6e626?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    bio: "Orchestrates interior palettes and joinery systems—warm tactility, calm tonality, and enduring comfort.",
  },
];

const pillars = [
  {
    title: "Proportion First",
    text: "We draw from classical orders and modern constraints. Each room balanced before embellishment.",
  },
  {
    title: "Material Honesty",
    text: "Stone feels like stone; timber like timber. Finishes are chosen for aging gracefully.",
  },
  {
    title: "Light as a Material",
    text: "Daylight is shaped, not added. Shadow gives measure—contrast remains measured.",
  },
  {
    title: "Quiet Utility",
    text: "Details disappear into function. Comfort and service access are designed, not appended.",
  },
];

const process = [
  {
    k: "01",
    title: "Discovery & Brief",
    text: "Programme mapping, priorities, budget, and schedule alignment.",
  },
  {
    k: "02",
    title: "Concept & Proportion",
    text: "Massing, plan studies, light strategy, palette direction.",
  },
  {
    k: "03",
    title: "Design Development",
    text: "Joinery, material layers, envelope performance, coordination.",
  },
  {
    k: "04",
    title: "Documentation",
    text: "Tender packs, specifications, cost reviews.",
  },
  {
    k: "05",
    title: "Delivery & Tuning",
    text: "Site review, commissioning, post-occupancy fine-tuning.",
  },
];

const timeline = [
  { year: "2019", text: "Studio founded; first residential commissions." },
  { year: "2021", text: "Regional hospitality & commercial projects." },
  { year: "2023", text: "Press features and award shortlistings." },
  { year: "2025", text: "Lifecycle-driven specifications institutionalized." },
];

const press = [
  {
    logo: "https://images.unsplash.com/photo-1596079890687-58c51d24889a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774https://images.unsplash.com/photo-1596079890687-58c51d24889a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    name: "Anthology",
    href: "#",
  },
  {
    logo: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1634",
    name: "Frame",
    href: "#",
  },
  {
    logo: "https://images.unsplash.com/photo-1637787687868-620915e3b4b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",
    name: "Dezeen",
    href: "#",
  },
  {
    logo: "https://images.unsplash.com/photo-1654511043142-3785f5e4c8e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    name: "Wallpaper*",
    href: "#",
  },
];

const clients = [
  "Aman Group",
  "Tokopedia",
  "UOB",
  "Sequis",
  "Sinar Mas",
  "Artotel",
  "Unilever",
  "BCA",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO — Portrait editorial */}
      <section
        className="about-hero relative isolate overflow-clip"
        data-reveal-fade
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
            alt="Studio portrait"
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
            About AIL Studio
          </div>
          <h1
            className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl"
            data-reveal-up
          >
            A practice devoted to proportion, material, and light.
          </h1>
          <p
            className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl"
            data-reveal-up
          >
            We work with restraint—designing calm, enduring spaces tailored to
            everyday life.
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-7xl px-6 py-14" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_420px] gap-8 items-start">
            <div className="space-y-4" data-stagger>
              <h2 className="text-2xl md:text-3xl font-semibold">Manifesto</h2>
              <p className="text-sm text-muted-foreground max-w-prose">
                We value discipline over spectacle. Rooms that feel inevitable;
                details that prefer to be felt rather than seen. Materials are
                chosen to wear softly, light is shaped to be generous, and
                spatial order is tuned to daily rituals.
              </p>
              <p className="text-sm text-muted-foreground max-w-prose">
                We are rigorous about serviceability—access panels, cleaning
                edges, and replacement logic are embedded from the start. Luxury
                is quiet when it truly supports living.
              </p>
            </div>

            <figure
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/70"
              data-parallax-y="-8"
            >
              <Image
                src="https://images.unsplash.com/photo-1693578616322-c8abe6c7393d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
                alt="Atelier desk"
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
            Directors
          </h2>
          <p className="text-sm text-muted-foreground" data-reveal-up>
            Senior oversight on every project.
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
          <h2 className="text-2xl md:text-3xl font-semibold">Philosophy</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6" data-stagger>
            {pillars.map((p) => (
              <div key={p.title} className="space-y-2">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH / PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold" data-reveal-up>
            Approach
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl" data-reveal-up>
            From discovery to post-occupancy tuning, we keep one clear thread:
            proportion, material, and light aligned with daily use.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-4" data-stagger>
          {process.map((s) => (
            <div key={s.k} className="rounded-2xl border border-border/70 p-4">
              <div className="text-xs text-muted-foreground">{s.k}</div>
              <h3 className="mt-1 font-medium">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCOLADES & PUBLICATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-6" data-reveal-up>
        <div className="rounded-2xl border border-border/70 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div data-stagger>
              <h2 className="text-2xl md:text-3xl font-semibold">Accolades</h2>
              <ul className="mt-4 grid gap-3">
                <li className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">
                    Regional Design Awards
                  </span>
                  <span className="font-medium">Shortlist 2023</span>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">
                    Interior Craft Awards
                  </span>
                  <span className="font-medium">Nominee 2024</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" data-reveal-up>
                Publications
              </h2>
              <div
                className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
                data-stagger
              >
                {press.map((p) => (
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
          Selected Clients
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
          <h2 className="text-2xl md:text-3xl font-semibold">Timeline</h2>
          <div className="mt-4 relative">
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/80" />
            <div className="space-y-8" data-stagger>
              {timeline.map((t, i) => (
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
            &quot;AIL delivered a home that is both quiet and deeply functional.
            The craft holds up to daily life.&quot;
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            Client — Private Residence, 2024
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
              Start a Project
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Share your brief and timeline—we will respond with an initial read
              and scope.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/contact"
                className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
              >
                Contact Form
              </Link>
              <Link
                href="mailto:studio@example.com?subject=Project%20Enquiry%20—%20AIL%20Studio"
                className="rounded-xl border border-border/70 px-4 py-2 text-sm hover:border-border"
              >
                Email Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mount animations */}
      <AboutMotion />
    </>
  );
}
