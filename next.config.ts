import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // 允许局域网设备通过 IP 访问开发服务器（HMR 热更新）
  // 如果你的电脑局域网 IP 变了，把下面的 IP 换成新的即可
  allowedDevOrigins: ["192.168.0.101", "*.space-z.ai"],
};

export default nextConfig;
