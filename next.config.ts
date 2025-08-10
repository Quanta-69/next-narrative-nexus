import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
  },
};
module.exports = {
  images: {
    remotePatterns: [
      new URL(
        "https://hd.wallpaperswide.com/thumbs/blonde_girl_fashion_model_sunglasses-t1.jpg"
      ),
    ],
  },
};
export default nextConfig;
