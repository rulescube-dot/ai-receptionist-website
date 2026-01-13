import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string; // e.g. "/healthcare"
};

export default function Seo({ title, description, canonicalPath }: SeoProps) {
  useEffect(() => {
    document.title = title;

    // description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // canonical (optional)
    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      // If you know your production domain, set it here:
      // canonical.setAttribute("href", `https://yourdomain.com${canonicalPath}`);
      canonical.setAttribute("href", canonicalPath);
    }
  }, [title, description, canonicalPath]);

  return null;
}
