import type { Metadata } from "next";
import { headers } from "next/headers";

/**
 * 🔄 Dynamically generates page metadata by merging site-wide defaults with page-specific overrides.
 *
 * This function fetches site-wide metadata like the default title and description
 * from custom HTTP headers (`x-site-title`, `x-site-description`), then merges them
 * with optional page-specific metadata overrides.
 *
 * It appends the site-wide title as a suffix to the page title to maintain branding.
 *
 * @param overrides Optional partial Metadata object with page-specific properties to override.
 * @returns A Promise resolving to a merged Metadata object suitable for Next.js pages.
 *
 * @example
 * ```ts
 * // Usage in a Next.js page or layout component:
 * export const metadata = await generateDynamicMetadata({
 *   title: "About Us",
 *   description: "Learn more about our company"
 * });
 * ```
 */
const generateDynamicMetadata = async (overrides: Partial<Metadata> = {}): Promise<Metadata> => {
  const headersList = await headers();

  const siteTitle = headersList.get("x-site-title") || "Alpha Todo";

  const siteDescription = headersList.get("x-site-description") || "Manage your daily workflow";

  const fullTitle = overrides.title ? `${overrides.title} | ${siteTitle}` : siteTitle;

  return {
    title: fullTitle,
    description: overrides.description || siteDescription,
  };
};

export default generateDynamicMetadata;
