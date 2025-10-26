"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterStrip() {
  const [value, setValue] = useState("");
  const tNewsletter = useTranslations("home.newsletter");

  const onSubmit = (e) => {
    e.preventDefault();
    // di template: cukup placeholder. Integrasi bisa pakai API nanti.
    setValue("");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="rounded-2xl border border-border/70 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg md:text-xl font-medium">
            {tNewsletter("title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {tNewsletter("description")}
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex w-full md:w-auto gap-3">
          <Input
            type="email"
            placeholder={tNewsletter("emailPlaceholder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="w-full md:w-80"
          />
          <Button type="submit" className="rounded-xl">
            {tNewsletter("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
