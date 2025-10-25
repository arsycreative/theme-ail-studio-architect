// src/lib/whatsapp.js
export function normalizePhone(input) {
  const digits = (input || "").replace(/\D+/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppUrl(phone, text) {
  const msg = encodeURIComponent(text || "");
  return `https://wa.me/${normalizePhone(phone)}?text=${msg}`;
}
