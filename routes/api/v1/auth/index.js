const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword, login } = require('../../../../controllers/auth.controller');

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
