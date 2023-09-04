
const express = require('express');
const signUpHandler = require('../controller/userSignUpController');

const router = express.Router();


router.route("/")
.post(signUpHandler)


module.exports = router ;
