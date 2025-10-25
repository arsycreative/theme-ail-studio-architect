// src/app/contact/page.js
import Image from "next/image";
import ContactForm from "@/components/forms/ContactForm";
import EnquirySteps from "@/components/sections/EnquirySteps";
import FAQ from "@/components/sections/FAQ";
import MapBanner from "@/components/sections/MapBanner";

export const metadata = { title: "Contact — AIL Studio" };

export default function ContactPage() {
  return (
    <>
      {/* HERO editorial */}
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-border/70">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1700475021612-1005dfda26ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
              alt="Studio tone"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
          </div>
          <div className="relative p-10 md:p-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
              Contact AIL Studio
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold max-w-2xl">
              Start a project conversation.
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
              Share your brief and timeline—kami akan balas via WhatsApp dengan
              bacaan awal dan perkiraan langkah.
            </p>
          </div>
        </div>
      </section>

      {/* GRID: Form + Studio details */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
          <div className="rounded-2xl border border-border/70 p-6 md:p-8 bg-background">
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border/70 overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
                  alt="Studio exterior"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-medium">General Enquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    studio@example.com
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Office Hours</div>
                    <div>Mon–Fri, 10:00–18:00</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Phone</div>
                    <div>+62 21 0000 0000</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Jakarta</div>
                    <div>Kebayoran Baru</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Singapore</div>
                    <div>River Valley</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 p-6 text-sm text-muted-foreground">
              Sertakan <span className="text-foreground">budget perkiraan</span>{" "}
              dan <span className="text-foreground">target tanggal</span> jika
              ada. Berkas bisa dikirim setelah chat WA dimulai.
            </div>
          </aside>
        </div>
      </section>

      {/* Steps */}
      <EnquirySteps />

      {/* FAQ */}
      <FAQ />

      {/* Map */}
      <MapBanner />
    </>
  );
}
