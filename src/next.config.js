/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/next-api/:path*',
                destination: '/api/:path*'
            }
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mullak-dev.ruh-s3.bluvalt.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'mullak-test.ruh-s3.bluvalt.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'mullak-prod.ruh-s3.bluvalt.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'mullak-dev-team-test.ruh-s3.bluvalt.com',
                port: '',
                pathname: '/**'
            },
        ]
    }
};

module.exports = nextConfig;
