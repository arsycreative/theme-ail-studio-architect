import enMessages from "@/i18n/messages/en.json";
import idMessages from "@/i18n/messages/id.json";

const FALLBACK_LOCALE = "en";

const datasets = {
  en: enMessages.data,
  id: idMessages.data,
};

function getDataset(locale = FALLBACK_LOCALE) {
  return datasets[locale] ?? datasets[FALLBACK_LOCALE];
}

export function getProjects(locale) {
  return getDataset(locale).projects;
}

export function getProjectBySlug(locale, slug) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getPress(locale) {
  return getDataset(locale).press;
}

export function getMaterials(locale) {
  return getDataset(locale).materials;
}

export function getPosts(locale) {
  return getDataset(locale).posts;
}
