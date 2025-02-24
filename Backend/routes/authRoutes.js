const express = require('express');
const { register, login, logout, sendVerifyOtp, VerifyEmail, isAuthenticate, sendResetOtp, resetpassword, getAdminData, checkData } = require('../controllers/authController');
const userAuth = require('../middleware/userAuth')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', userAuth, sendVerifyOtp);
router.post('/verify-account', userAuth, VerifyEmail);
router.get('/is-auth', userAuth, isAuthenticate);
router.post('/send-reset-otp', userAuth, sendResetOtp);
router.post('/reset-password', userAuth, resetpassword);
router.get('/admin-data', getAdminData);
router.get('/check', checkData);

module.exports = router; // Use CommonJS export
