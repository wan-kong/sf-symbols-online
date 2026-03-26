import "@sf-symbols-online/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "export",
};

export default nextConfig;
