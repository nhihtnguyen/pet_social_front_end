const path = require('path');

module.exports = {
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
