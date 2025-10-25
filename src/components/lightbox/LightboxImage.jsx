"use client";
import Image from "next/image";

export default function LightboxImage({
  src,
  alt,
  className,
  sizes,
  fill,
  width,
  height,
}) {
  // Render next/image tapi juga expose data-lightbox agar provider menangkap click
  const common = {
    "data-lightbox": "true",
    "data-src": src,
    alt: alt || "Image",
    className: className || "object-cover",
  };

  if (fill) {
    return <Image src={src} fill sizes={sizes || "100vw"} {...common} />;
  }
  return (
    <Image
      src={src}
      width={width}
      height={height}
      sizes={sizes || "100vw"}
      {...common}
    />
  );
}
