"use client";
import Link from "next/link";

export default function EnquiriesStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg md:text-xl font-medium">
            Enquiries & Collaborations
          </h3>
          <p className="text-sm text-muted-foreground">
            For commissions, collaborations, or press—please get in touch.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 text-sm">
          <Link
            href="/contact"
            className="underline underline-offset-4"
            data-cursor="View"
          >
            Contact Form
          </Link>
          <span className="hidden md:inline text-muted-foreground">/</span>
          <a
            href="mailto:studio@example.com"
            className="underline underline-offset-4"
            data-cursor="View"
          >
            studio@example.com
          </a>
          <span className="hidden md:inline text-muted-foreground">/</span>
          <a
            href="tel:+620000000"
            className="underline underline-offset-4"
            data-cursor="View"
          >
            +62 000 0000
          </a>
        </div>
      </div>
    </section>
  );
}
