/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { useWasmBinary: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zhpapjrtricjmvfeutri.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  //   output: "export",
};

export default nextConfig;
