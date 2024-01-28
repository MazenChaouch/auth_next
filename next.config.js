/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/nextauthjs/next-auth/main/docs/static/img/logo/logo.png",
      },
    ],
  },
};
