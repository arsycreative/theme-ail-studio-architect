"use client";
import { DefaultSeo } from "next-seo";
import { useTranslations } from "next-intl";
import { defaultSEO } from "@/lib/seo";

export default function SEOProvider() {
  const tSeo = useTranslations("seo");
  const tCommon = useTranslations("common");

  const config = {
    ...defaultSEO,
    title: tSeo("title"),
    description: tSeo("description"),
    openGraph: {
      ...defaultSEO.openGraph,
      title: tSeo("title"),
      description: tSeo("description"),
      site_name: tCommon("brand"),
    },
    twitter: {
      ...defaultSEO.twitter,
      title: tSeo("title"),
      description: tSeo("description"),
    },
  };

  return <DefaultSeo {...config} />;
}
