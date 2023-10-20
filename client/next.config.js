/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['s3.amazonaws.com'],
    }
}

module.exports = nextConfig
