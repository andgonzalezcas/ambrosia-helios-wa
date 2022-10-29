/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: 'https://ambrosia-cronos-ag-4axjffbidq-uc.a.run.app/graphql',
        destination: 'http://localhost:3000/',
      },
    ]
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
