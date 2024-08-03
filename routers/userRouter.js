const express = require('express');
const router = express.Router();
const {userLogin, userSignup, userLogout} = require('../controllers/authController');

router.post('/login', userLogin)
router.post('/signup', userSignup)
router.get('/logout', userLogout)

module.exports = router;