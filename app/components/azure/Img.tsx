import { getImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";

// Ham <img> yerine: yerel fotoğraf ve YouTube kapağı Next görsel optimizasyonundan geçer (ekran genişliğine göre srcset, AVIF/WebP).
// Görünüm aynı kalır: sınıf ve stil dokunulmaz, yalnız src/srcset değişir. SVG ve izin verilmeyen dış adresler olduğu gibi kalır.
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & { src: string; sizes: string; quality?: 65 | 75 };

const optimizable = (s: string) => (s.startsWith("/") && !s.startsWith("//") && !s.endsWith(".svg")) || s.startsWith("https://i.ytimg.com/");

export default function Img({ src, sizes, quality = 75, alt = "", loading = "lazy", decoding = "async", ...rest }: Props) {
  if (!optimizable(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} src={src} alt={alt} loading={loading} decoding={decoding} />;
  }
  const { props } = getImageProps({ src, alt, fill: true, sizes, quality });
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} src={props.src} srcSet={props.srcSet} sizes={props.sizes} alt={alt} loading={loading} decoding={decoding} />;
}
