import type { MetadataRoute } from "next";
import { CLASSES } from "@/lib/classes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-melanom-check.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/demo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/klassen`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/muttermal`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/methods`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/risk`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/impressum`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/datenschutz`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const classRoutes: MetadataRoute.Sitemap = CLASSES.map((klass) => ({
    url: `${SITE_URL}/klassen/${klass.code}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...classRoutes];
}
