const express=require('express');
const { registerUser, LoginUser } = require('../controllers/AuthController');
var router = express.Router();

router.post('/register',registerUser)
router.post('/login',LoginUser)

module.exports = router;

