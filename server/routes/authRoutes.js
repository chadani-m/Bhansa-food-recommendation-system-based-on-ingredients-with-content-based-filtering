const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.registerUser);
router.get('/login', authController.loginUser);
router.get('/register', authController.register);
router.post('/register', authController.registerUserOnPost);
router.post('/login', authController.loginUserOnPost);

module.exports = router;
