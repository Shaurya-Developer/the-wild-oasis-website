/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rupznixgotgimwwrhfoq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export", // by this our site will be completely be exported as static asset
}; // If we are fetching images from some server we have to configure it

export default nextConfig;
