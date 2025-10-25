"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Bagaimana alur kerja dari kick-off hingga serah terima?",
    a: "Discovery → konsep → pengembangan desain → dokumentasi teknis → koordinasi tender → supervisi site & commissioning.",
  },
  {
    q: "Apakah studio menerima proyek luar kota/luar negeri?",
    a: "Ya, kami bekerja lintas kota & regional; proses koordinasi disesuaikan (hybrid site visit & digital review).",
  },
  {
    q: "Range biaya desain seperti apa?",
    a: "Fee berbasis skala & kompleksitas. Kami akan mengestimasi setelah memahami program, luas, dan target material.",
  },
  {
    q: "Material sustainability diperhatikan?",
    a: "Kami menilai lifecycle, sourcing, dan perawatan. Fokus ke durability & efisiensi energi pasif.",
  },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">FAQ</h2>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border/70 divide-y divide-border/70"
      >
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="px-4 md:px-6">
            <AccordionTrigger className="py-4 text-left">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
