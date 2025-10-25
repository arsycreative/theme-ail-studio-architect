// src/app/layout.js
import "@/app/globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import SmoothScroll from "@/components/effects/SmoothScroll";
import TransitionProvider from "@/components/transitions/TransitionProvider";
import MainNav from "@/components/nav/MainNav";
import Footer from "@/components/sections/Footer";
import CursorLabel from "@/components/sections/CursorLabel";
import LightboxProvider from "@/components/lightbox/LightboxProvider";
import GlobalLoader from "@/components/effects/GlobalLoader";
import WhatsAppButton from "@/components/effects/WhatsAppButton";

export const metadata = {
  title: "Architecture • Interiors • Living",
  description:
    "Studio arsitektur & interior mewah. Residensial & komersial dengan pendekatan bespoke.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    siteName: "AIL Studio",
    title: "Architecture • Interiors • Living",
    description:
      "Studio arsitektur & interior mewah. Residensial & komersial dengan pendekatan bespoke.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture • Interiors • Living",
    description:
      "Studio arsitektur & interior mewah. Residensial & komersial dengan pendekatan bespoke.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" cz-shortcut-listen="true">
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
      </body>
    </html>
  );
}
