"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const ENQUIRY_TYPES = ["Project", "Collaboration", "Press"];

export default function ContactForm() {
  const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";

  const [state, setState] = useState("idle");
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [selectedType, setSelectedType] = useState(ENQUIRY_TYPES[0]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: "Residential",
    budget: "",
    timeline: "",
    message: "",
    company: "", // honeypot
  });

  useEffect(() => setErrors({}), [form]);

  const canSubmit = useMemo(
    () =>
      form.name.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.message.trim() &&
      state !== "sending",
    [form, state]
  );

  const budgetPresets = [
    "Under USD 250k",
    "USD 250k–500k",
    "USD 500k–1M",
    "USD 1M+",
  ];
  const timelinePresets = [
    "0–3 months",
    "3–6 months",
    "6–12 months",
    "12+ months",
  ];

  function buildMessage() {
    const lines = [
      `${selectedType} Enquiry — AIL Studio`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `WhatsApp: ${form.phone}` : null,
      form.location ? `Location: ${form.location}` : null,
      selectedType === "Project" ? `Type: ${form.projectType || "-"}` : null,
      form.budget ? `Budget: ${form.budget}` : null,
      form.timeline ? `Timeline: ${form.timeline}` : null,
      "",
      "Message:",
      form.message,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function onSubmit(e) {
    e.preventDefault();

    const elapsed = Date.now() - startedAt;
    if (elapsed < 2500) {
      setState("error");
      setErrors({ global: "Please take a moment to complete the form." });
      return;
    }
    if (form.company) {
      setState("success");
      return;
    }

    const nextErr = {};
    if (!form.name.trim()) nextErr.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      nextErr.email = "Valid email is required.";
    if (!form.message.trim())
      nextErr.message = "Please tell us a bit about the project.";
    if (Object.keys(nextErr).length) {
      setErrors(nextErr);
      return;
    }

    setState("sending");
    const url = buildWhatsAppUrl(WA_NUMBER, buildMessage());

    if (typeof window !== "undefined") {
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url;
    }
    setState("success");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-semibold">Project Enquiry</h2>
        <p className="text-sm text-muted-foreground">
          Balas via WhatsApp. Kami akan merespons dalam 2–3 hari kerja.
        </p>
      </div>

      {/* Enquiry Type */}
      <div className="flex flex-wrap gap-2">
        {ENQUIRY_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-full border text-xs ${
              selectedType === t
                ? "border-foreground"
                : "border-border/70 hover:border-border"
            }`}
            aria-pressed={selectedType === t}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
          />
        </label>
      </div>

      {/* Basic info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Full name *"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Email *"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="WhatsApp number (optional)"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <Input
          placeholder="Project location (city/country)"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
        />
      </div>

      {/* Project-specific fields */}
      {selectedType === "Project" && (
        <div className="grid md:grid-cols-3 gap-4">
          <select
            className="rounded-xl border border-border/70 bg-background px-3 py-2 text-sm"
            value={form.projectType}
            onChange={(e) =>
              setForm((f) => ({ ...f, projectType: e.target.value }))
            }
            aria-label="Project type"
          >
            <option>Residential</option>
            <option>Hospitality</option>
            <option>Workspace</option>
            <option>Retail</option>
            <option>Mixed-use</option>
          </select>

          <div className="flex flex-wrap gap-2">
            {budgetPresets.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setForm((f) => ({ ...f, budget: b }))}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  form.budget === b
                    ? "border-foreground"
                    : "border-border/70 hover:border-border"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {timelinePresets.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, timeline: t }))}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  form.timeline === t
                    ? "border-foreground"
                    : "border-border/70 hover:border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <Textarea
          placeholder="Tell us about scope, rooms/areas, constraints, and goals. *"
          rows={6}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <Button type="submit" className="rounded-xl" disabled={!canSubmit}>
          {state === "sending" ? "Opening WhatsApp…" : "Send via WhatsApp"}
        </Button>
        {errors.global && (
          <p className="text-sm text-red-600">{errors.global}</p>
        )}
        {state === "success" && (
          <p className="text-sm text-emerald-600">
            Redirected to WhatsApp. If it didn’t open, allow pop-ups and try
            again.
          </p>
        )}
      </div>
    </form>
  );
}
