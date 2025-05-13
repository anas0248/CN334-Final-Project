/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PRODUCT_API_URL: process.env.NEXT_PUBLIC_PRODUCT_API_URL,
    NEXT_PUBLIC_USER_API_URL: process.env.NEXT_PUBLIC_USER_API_URL,
  },
};

export default nextConfig;