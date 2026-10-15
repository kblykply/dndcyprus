import manifest from "./portrait-assets.json";

export function portraitSource(src: string) {
  return (manifest as Record<string, string>)[src] || src;
}
