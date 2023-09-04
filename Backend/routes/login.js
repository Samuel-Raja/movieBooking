
const express = require('express');
const handleLogin = require('../controller/loginController');

const router = express.Router();


router.route('/')
.post(handleLogin)




module.exports = router ;