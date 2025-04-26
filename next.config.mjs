/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                pathname: '/**', // Match all paths
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**', // Match all paths
            },
        ],
    },
};

export default nextConfig;
