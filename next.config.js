/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['beautyschools.ru', 'images.unsplash.com', 'vk.com']
  },
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
}

module.exports = nextConfig
