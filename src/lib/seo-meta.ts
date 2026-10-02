const normalize = (value: string) => value.replace(/[\s\u00a0\u202f]+/g, " ").trim();
function cut(value: string, max: number): string {
  const text = normalize(value);
  if (text.length <= max) return text;
  const head = text.slice(0, max), boundary = head.lastIndexOf(" ");
  return (boundary > max * 0.5 ? head.slice(0, boundary) : head).replace(/[\s|·•,;:/\-–—]+$/u, "").trim();
}
export function clampTitle(value: string): string { return cut(value, 60); }
export function clampDescription(value: string): string { const text = normalize(value); return text.length <= 155 ? text : `${cut(text, 154)}…`; }

export interface OgImageOptions {
  q: string;
  sub?: string;
  badge?: string;
}

export function ogImageUrl(options: OgImageOptions): string {
  const base = "https://www.expertsecuriteincendie.fr/api/og";
  const params = new URLSearchParams();
  params.set("q", options.q);
  if (options.sub) params.set("sub", options.sub);
  if (options.badge) params.set("badge", options.badge);
  return `${base}?${params.toString()}`;
}

export function breadcrumbList(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : `https://www.expertsecuriteincendie.fr${item.item}`,
    })),
  };
}
