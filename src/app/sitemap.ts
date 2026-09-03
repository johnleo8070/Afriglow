import { MetadataRoute } from "next";
import { HAIRSTYLES_DATA } from "@/lib/hairstyles-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://afrihub.com.au";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/hairstyles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },

    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cancellation-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const hairstyleRoutes: MetadataRoute.Sitemap = HAIRSTYLES_DATA.map((style) => ({
    url: `${baseUrl}/hairstyles/${style.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...hairstyleRoutes];
}
