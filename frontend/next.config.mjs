/** @type {import('next').NextConfig} */
const nextConfig = {
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
