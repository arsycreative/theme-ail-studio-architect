import ThemeProvider from "@/providers/ThemeProvider";
import SmoothScroll from "@/components/effects/SmoothScroll";
import TransitionProvider from "@/components/transitions/TransitionProvider";
import MainNav from "@/components/nav/MainNav";
import Footer from "@/components/sections/Footer";
import CursorLabel from "@/components/sections/CursorLabel";
import LightboxProvider from "@/components/lightbox/LightboxProvider";
import GlobalLoader from "@/components/effects/GlobalLoader";
import WhatsAppButton from "@/components/effects/WhatsAppButton";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { locales } from "@/i18n/routing";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tSeo = await getTranslations({
    locale,
    namespace: "seo",
  });
  const tCommon = await getTranslations({
    locale,
    namespace: "common",
  });

  const title = tSeo("title");
  const description = tSeo("description");

  return {
    title,
    description,
    metadataBase: new URL("https://example.com"),
    openGraph: {
      type: "website",
      siteName: tCommon("brand"),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  if (process.env.NODE_ENV !== "production" && messages?.hero) {
    console.log("Layout messages hero heading:", messages.hero.heading);
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GlobalLoader />
      <CursorLabel />
      <ThemeProvider>
        <SmoothScroll>
          <LightboxProvider>
            <MainNav />
            <TransitionProvider>
              <main className="pt-16">{children}</main>
              <Footer />
            </TransitionProvider>
            <div className="h-px" aria-hidden />
          </LightboxProvider>
          <WhatsAppButton />
        </SmoothScroll>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
