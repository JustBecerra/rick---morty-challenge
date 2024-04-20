/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "rickandmortyapi.com",
    //     port: "",
    //     pathname: "/api/character/avatar/**",
    //   },
    // ],
    domains: ["rickandmortyapi.com"],
  },
};

export default nextConfig;
