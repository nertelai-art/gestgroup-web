import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // L'únic layout arrel és el de /[lang]: sense això, una adreça sense idioma surt amb la 404 nua de Next.
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Sense «immutable» a /clients: els noms dels logos no porten hash i es poden tornar a preparar.
    ];
  },
};

export default nextConfig;
