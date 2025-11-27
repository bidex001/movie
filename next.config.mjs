/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.weatherapi.com", "image.tmdb.org"], // merged into one array
  },
};

export default nextConfig;

