/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.dicebear.com",
                pathname: "/**",
            },
        ]
    },
    reactStrictMode: false
};

export default nextConfig;
