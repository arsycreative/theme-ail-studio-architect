"use client";
import Image from "next/image";

export default function MapBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/70">
        <div className="relative h-[320px] md:h-[420px]">
          {/* Placeholder map editorial; ganti dengan embed map custom jika mau */}
          <Image
            src="https://images.unsplash.com/photo-1716758406306-853301c13ece?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
            alt="Map placeholder"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
        </div>
        <div className="absolute left-6 top-6 rounded-xl border border-border/70 bg-background/80 backdrop-blur px-4 py-3">
          <div className="text-xs text-muted-foreground">Studio</div>
          <div className="font-medium">Jakarta • Singapore</div>
        </div>
      </div>
    </section>
  );
}
