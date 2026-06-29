import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
  webpack(config) {
    // Suppress missing optional peer-dep warnings from @privy-io/react-auth
    // (fiat on-ramp and Farcaster Solana features we don't use)
    config.resolve.alias = {
      ...config.resolve.alias,
      "@stripe/crypto": false,
      "@farcaster/mini-app-solana": false,
    };
    return config;
  },
};

export default nextConfig;
