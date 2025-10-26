"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const tFaq = useTranslations("home.faq");
  const faqs = useMemo(() => tFaq.raw("items") ?? [], [tFaq]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        {tFaq("title")}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border/70 divide-y divide-border/70"
      >
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="px-4 md:px-6">
            <AccordionTrigger className="py-4 text-left">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
