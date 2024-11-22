import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Strict 모드 끄기
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
