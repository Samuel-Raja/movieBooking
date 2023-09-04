
const express = require('express');
const logoutHandler = require('../controller/logoutController');

const router = express.Router();


router.route('/')
.get(logoutHandler)



module.exports = router ;