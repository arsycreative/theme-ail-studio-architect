"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";

  const enquiryTypes = t.raw("types") ?? [];
  const projectTypes = t.raw("projectTypes") ?? [];
  const budgetPresets = t.raw("budgetPresets") ?? [];
  const timelinePresets = t.raw("timelinePresets") ?? [];
  const placeholders = t.raw("placeholders") ?? {};
  const labels = t.raw("labels") ?? {};
  const errorsCopy = t.raw("errors") ?? {};
  const buttons = t.raw("buttons") ?? {};
  const messageLabels = t.raw("messageLabels") ?? {};

  const defaultEnquiryType = enquiryTypes[0] ?? "Project";
  const defaultProjectType = projectTypes[0] ?? "Residential";

  const [state, setState] = useState("idle");
  const [startedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState({});
  const [selectedType, setSelectedType] = useState(defaultEnquiryType);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: defaultProjectType,
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

  function buildMessage() {
    const lines = [
      t("whatsAppSubject", { type: selectedType || defaultEnquiryType }),
      "",
      `${messageLabels.name ?? "Name"}: ${form.name}`,
      `${messageLabels.email ?? "Email"}: ${form.email}`,
      form.phone ? `${messageLabels.phone ?? "WhatsApp"}: ${form.phone}` : null,
      form.location
        ? `${messageLabels.location ?? "Location"}: ${form.location}`
        : null,
      (selectedType || defaultEnquiryType) === defaultEnquiryType
        ? `${messageLabels.type ?? "Type"}: ${form.projectType || "-"}`
        : null,
      form.budget
        ? `${messageLabels.budget ?? "Budget"}: ${form.budget}`
        : null,
      form.timeline
        ? `${messageLabels.timeline ?? "Timeline"}: ${form.timeline}`
        : null,
      "",
      messageLabels.message ?? "Message:",
      form.message,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function onSubmit(e) {
    e.preventDefault();

    const elapsed = Date.now() - startedAt;
    if (elapsed < 2500) {
      setState("error");
      setErrors({ global: errorsCopy.global });
      return;
    }
    if (form.company) {
      setState("success");
      return;
    }

    const nextErr = {};
    if (!form.name.trim()) nextErr.name = errorsCopy.name;
    if (!/\S+@\S+\.\S+/.test(form.email))
      nextErr.email = errorsCopy.email;
    if (!form.message.trim())
      nextErr.message = errorsCopy.message;
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

  useEffect(() => {
    setSelectedType((prev) =>
      enquiryTypes.includes(prev) ? prev : defaultEnquiryType
    );
    setForm((prev) => ({
      ...prev,
      projectType: projectTypes.includes(prev.projectType)
        ? prev.projectType
        : defaultProjectType,
    }));
  }, [enquiryTypes, defaultEnquiryType, projectTypes, defaultProjectType]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-semibold">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>

      {/* Enquiry Type */}
      <div className="flex flex-wrap gap-2">
        {enquiryTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-full border text-xs ${
              selectedType === type
                ? "border-foreground"
                : "border-border/70 hover:border-border"
            }`}
            aria-pressed={selectedType === type}
          >
            {type}
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
            placeholder={placeholders.name}
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
            placeholder={placeholders.email}
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
          placeholder={placeholders.phone}
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <Input
          placeholder={placeholders.location}
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
        />
      </div>

      {/* Project-specific fields */}
      {selectedType === defaultEnquiryType && (
        <div className="grid md:grid-cols-3 gap-4">
          <select
            className="rounded-xl border border-border/70 bg-background px-3 py-2 text-sm"
            value={form.projectType}
            onChange={(e) =>
              setForm((f) => ({ ...f, projectType: e.target.value }))
            }
            aria-label={labels.projectType}
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
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
          placeholder={placeholders.message}
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
          {state === "sending" ? buttons.submitting : buttons.submit}
        </Button>
        {errors.global && (
          <p className="text-sm text-red-600">{errors.global}</p>
        )}
        {state === "success" && (
          <p className="text-sm text-emerald-600">
            {t("success")}
          </p>
        )}
      </div>
    </form>
  );
}
