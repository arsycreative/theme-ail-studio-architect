"use client";

const clients = [
  "Lumine Group",
  "Arcadia Dev",
  "Kawana Hotels",
  "Astraea Partners",
  "Citrine Capital",
  "Nara Living",
  "Southline",
  "Vireo Estates",
];

export default function Clients() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Selected Clients
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {clients.map((c) => (
          <div
            key={c}
            className="rounded-2xl border border-dashed border-border/60 p-6 text-center"
          >
            <span className="text-sm">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
