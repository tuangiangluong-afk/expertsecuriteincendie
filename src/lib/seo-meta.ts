const normalize = (value: string) => value.replace(/[\s\u00a0\u202f]+/g, " ").trim();
function cut(value: string, max: number): string {
  const text = normalize(value);
  if (text.length <= max) return text;
  const head = text.slice(0, max), boundary = head.lastIndexOf(" ");
  return (boundary > max * 0.5 ? head.slice(0, boundary) : head).replace(/[\s|·•,;:/\-–—]+$/u, "").trim();
}
export function clampTitle(value: string): string { return cut(value, 60); }
export function clampDescription(value: string): string { const text = normalize(value); return text.length <= 155 ? text : `${cut(text, 154)}…`; }
