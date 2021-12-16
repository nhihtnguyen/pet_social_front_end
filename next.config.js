const path = require('path');

module.exports = {
  async headers() {
    return [
      {
        source: '/settings',
        headers: [
          {
            key: 'X-Settings-Custom-Header',
            value: 'settings_header_value',
          },
        ],
      },
      {
        source: '/explore',
        headers: [
          {
            key: 'X-Explore-Header',
            value: 'explore_header_value',
          },
        ],
      },
      {
        source: '/post/:id',
        headers: [
          {
            key: 'X-Post-Custom-Header',
            value: 'post_header_value',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'via.placeholder.com',
      'placeholder.com',
      'picsum.photos',
      'res.cloudinary.com',
      'ipfs.infura.io',
    ],
  },
};
