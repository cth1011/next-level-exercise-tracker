/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/blocks/marketing-ui/hero/phone-mockup.png",
      },
    ],
  },
};

module.exports = nextConfig;
