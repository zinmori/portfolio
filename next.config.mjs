/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.pdf': {
        loaders: ['file-loader'],
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(pdf)$/,
        type: 'asset/resource',
      });
    }
    return config;
  },
};

export default nextConfig;
