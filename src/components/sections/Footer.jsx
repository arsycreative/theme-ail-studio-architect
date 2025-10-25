"use client";
export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p>© {new Date().getFullYear()} AIL Studio. All rights reserved.</p>
        <p className="text-muted-foreground">
          Architecture — Interiors — Living
        </p>
      </div>
    </footer>
  );
}
