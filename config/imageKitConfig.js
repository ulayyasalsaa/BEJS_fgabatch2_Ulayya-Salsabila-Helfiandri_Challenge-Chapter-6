const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: 'your_public_key',
  privateKey: 'your_private_key',
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id'
});

module.exports = imagekit;
