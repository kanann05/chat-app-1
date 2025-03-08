import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: '/api/socket/:path*',
      },
    ];
  }
};

export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // Optional but recommended
// };

// export default nextConfig;

