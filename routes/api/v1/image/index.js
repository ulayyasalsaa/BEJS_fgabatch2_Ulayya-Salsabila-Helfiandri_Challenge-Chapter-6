const express = require('express');
const IMAGE_CONTROLLER = require('../../../../controllers/image.controller');
const upload = require('../../../../config/multerConfig');
const router = express.Router();

// Unggah gambar
router.post('/images', upload.single('image'), IMAGE_CONTROLLER.uploadImage);

// Lihat daftar gambar
router.get('/images', IMAGE_CONTROLLER.getAllImages);

// Lihat detail gambar
router.get('/images/:id', IMAGE_CONTROLLER.getImageById);

// Hapus gambar
router.delete('/images/:id', IMAGE_CONTROLLER.deleteImage);

// Edit judul dan deskripsi gambar
router.put('/images/:id', IMAGE_CONTROLLER.updateImage);

module.exports = router;
