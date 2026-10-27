import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Les photos clients vivent dans /public/images (aucun domaine externe requis).
    // Ajoutez ici un remotePattern si un client heberge ses visuels ailleurs.
    remotePatterns: [],
  },
};

export default nextConfig;
