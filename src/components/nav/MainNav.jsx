"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "./LocaleSwitcher";

const NAV_LINKS = [
  { href: "/projects", key: "projects" },
  { href: "/studio", key: "studio" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export default function MainNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav.links");
  const tLanguage = useTranslations("nav.language");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const ToggleThemeButton = () =>
    mounted ? (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={tCommon("aria.toggleTheme")}
        className="rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" aria-hidden />
        ) : (
          <Moon className="h-5 w-5" aria-hidden />
        )}
      </Button>
    ) : null;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-wide">
          {tCommon("brand")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:opacity-80"
            >
              {tNav(link.key)}
            </Link>
          ))}

          <Separator orientation="vertical" className="h-6" />
          <LocaleSwitcher />

          <ToggleThemeButton />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/80 p-2.5 text-sm transition hover:bg-background md:hidden"
          aria-label={tCommon("aria.toggleNavigation")}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 z-30 border-b border-border/60 bg-background/95 backdrop-blur-md transition-transform duration-300 ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-4 px-6 py-6">
          <nav className="flex flex-col gap-2 text-base">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3 transition hover:border-border"
              >
                <span>{tNav(link.key)}</span>
                <span className="text-xs text-muted-foreground" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
              <span className="text-sm">{tCommon("theme")}</span>
              <ToggleThemeButton />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
              <span className="text-sm">{tLanguage("label")}</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
