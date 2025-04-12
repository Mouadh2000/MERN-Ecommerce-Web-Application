const express = require('express');
const upload = require('../config/multerconfig');
const router = express.Router();
const clientAuthController = require('../controllers/client/clientAuthController');
const CategoryController = require('../controllers/admin/CategoryController');
const ProductController = require('../controllers/admin/ProductController');
const PaymentMethodController = require('../controllers/admin/paymentMethodController');
const ClientOrderController = require('../controllers/client/clientOrderController');
const ComplaintController = require('../controllers/admin/complaintController.js');


const AuthenticateClient = require('../middleware/authenticateClient');
const clientOrderController = new ClientOrderController();


const authMiddleware = new AuthenticateClient(process.env.JWT_SECRET);
// Client Routes
router.post('/signup', upload.single('profileImage'), clientAuthController.signup);
router.post('/login', clientAuthController.login);
router.post('/login/refresh', clientAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), clientAuthController.getClientDetails);

// Category Routes
router.get('/categories/', CategoryController.getAllCategories);
router.get('/category/:id', CategoryController.getCategoryById);

// Product Routes
router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.get('/products/category/:categoryId', ProductController.getProductsByCategory);
router.get('/product/stock/:id', ProductController.checkProductStock);
router.get('/products/top-rated', ProductController.getTopRatedProducts);

// Order Routes
router.post('/order',authMiddleware.authenticate.bind(authMiddleware), clientOrderController.handleRequest.bind(clientOrderController));
router.get('/orders/:clientId',authMiddleware.authenticate.bind(authMiddleware), clientOrderController.getClientOrders.bind(clientOrderController));

// Complaint Routes
router.post('/complaint', ComplaintController.createComplaint);

// PaymentMethods Routes
router.get('/payment-methods', authMiddleware.authenticate.bind(authMiddleware), PaymentMethodController.getAllPaymentMethods);
router.get('/payment-method/:id', authMiddleware.authenticate.bind(authMiddleware), PaymentMethodController.getPaymentMethodById);

module.exports = router;