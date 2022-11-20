/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    GRAPHQL_URL: process.env.GRAPHQL_URL
  },
  images: {
    domains: [
      'lh3.googleusercontent.com'
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
