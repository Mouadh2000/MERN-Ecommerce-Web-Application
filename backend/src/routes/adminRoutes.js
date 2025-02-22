const express = require('express');
const upload = require('../config/multerconfig');
const router = express.Router();
const adminAuthController = require('../controllers/admin/adminAuthController');


const AuthenticateAdmin = require('../middleware/AuthenticateAdmin');

const authMiddleware = new AuthenticateAdmin(process.env.JWT_SECRET);

router.post('/login', adminAuthController.login);
router.post('/login/refresh', adminAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), adminAuthController.getAdminDetails);

module.exports = router;