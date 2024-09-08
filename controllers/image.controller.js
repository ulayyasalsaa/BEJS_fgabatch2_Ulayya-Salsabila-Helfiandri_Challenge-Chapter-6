const imagekit = require('../config/imageKitConfig');
const prisma = require('../prismaClient');

// Mengunggah gambar bersama dengan judul dan deskripsi
const uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    // Upload ke ImageKit.io
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: req.file.originalname,
      folder: '/uploads'
    });

    // Simpan info gambar ke database
    const newImage = await prisma.image.create({
      data: {
        title,
        description,
        imageUrl: uploadResponse.url
      }
    });

    res.json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: newImage
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
};

// Melihat daftar gambar
const getAllImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.json({
      status: 'success',
      message: 'Images retrieved successfully',
      data: images
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'error',
      message: 'Failed to retrieve images'
    });
  }
};

// Melihat detail gambar
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) }
    });

    if (!image) {
      return res.json({
        status: 'error',
        message: 'Image not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Image retrieved successfully',
      data: image
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'error',
      message: 'Failed to retrieve image'
    });
  }
};

// Menghapus gambar
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari gambar di database
    const image = await prisma.image.findUnique({ where: { id: parseInt(id) } });

    if (!image) {
      return res.json({
        status: 'error',
        message: 'Image not found'
      });
    }

    // Hapus gambar dari ImageKit.io
    await imagekit.deleteFile(image.imageUrl.split('/').pop());

    // Hapus gambar dari database
    await prisma.image.delete({ where: { id: parseInt(id) } });

    res.json({
      status: 'success',
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'error',
      message: 'Failed to delete image'
    });
  }
};

// Mengedit judul dan deskripsi gambar
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedImage = await prisma.image.update({
      where: { id: parseInt(id) },
      data: { title, description }
    });

    res.json({
      status: 'success',
      message: 'Image updated successfully',
      data: updatedImage
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'error',
      message: 'Failed to update image'
    });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImage,
  updateImage
};
