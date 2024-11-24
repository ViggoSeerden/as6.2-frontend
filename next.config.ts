import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_AUTH0_ISSUER: process.env.AUTH_AUTH0_ISSUER,
    AUTH_AUTH0_ID: process.env.AUTH_AUTH0_ID,
    AUTH_AUTH0_AUDIENCE: process.env.AUTH_AUTH0_AUDIENCE,
    AUTH_AUTH0_SECRET: process.env.AUTH_AUTH0_SECRET,
  }
};

export default nextConfig;
