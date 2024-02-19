/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'https://daisyui.com/images/stock/',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'https://tecdn.b-cdn.net',
        port: '',
        pathname: 'img/Photos/Slides/**',
      },
    ],
  },
}

module.exports = nextConfig
