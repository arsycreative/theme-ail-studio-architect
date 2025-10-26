import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

const nextConfig = {
  images: {
    // Izinkan Unsplash
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],

    // Kurangi variasi ukuran supaya tidak request w=3840
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],

    // Transform lebih ringan
    formats: ["image/webp"],

    // DEV: bypass optimizer biar cepat ketahuan masalah fetch/transform
    unoptimized: isDev,

    // Cache lebih lama
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 hari
  },
};

export default withNextIntl(nextConfig);
