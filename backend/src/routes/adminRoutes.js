const express = require('express');
const upload = require('../config/multerconfig');
const router = express.Router();
const adminAuthController = require('../controllers/admin/adminAuthController');
const AdminController = require('../controllers/admin/adminController');
const clientController = require('../controllers/admin/ClientController');
const CategoryController = require('../controllers/admin/CategoryController');
const ProductController = require('../controllers/admin/ProductController');
const PaymentMethodController = require('../controllers/admin/paymentMethodController');
const AdminOrderController = require('../controllers/admin/adminOrderController');
const ComplaintController = require('../controllers/admin/complaintController.js');


const AuthenticateAdmin = require('../middleware/AuthenticateAdmin');
const adminOrderController = new AdminOrderController();


const authMiddleware = new AuthenticateAdmin(process.env.JWT_SECRET);

router.post('/login', adminAuthController.login);
router.post('/login/refresh', adminAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), adminAuthController.getAdminDetails);

router.get('/count', AdminController.countAdmins);
router.get('/client/count', clientController.countClients);



// Category Routes
router.post('/category/create/',authMiddleware.authorizeAdmin.bind(authMiddleware), CategoryController.createCategory);
router.get('/categories/',authMiddleware.authorizeAdmin.bind(authMiddleware), CategoryController.getAllCategories);
router.get('/category/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), CategoryController.getCategoryById);
router.put('/category/update/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), CategoryController.updateCategory);
router.delete('/category/delete/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), CategoryController.deleteCategory);

// Product Routes
router.post('/product/create', authMiddleware.authorizeAdmin.bind(authMiddleware), upload.single('image'), ProductController.createProduct);
router.get('/products', authMiddleware.authorizeAdmin.bind(authMiddleware), ProductController.getAllProducts);
router.get('/product/:id', authMiddleware.authorizeAdmin.bind(authMiddleware), ProductController.getProductById);
router.put('/product/update/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), upload.single('image'), ProductController.updateProduct);
router.delete('/product/delete/:id', authMiddleware.authorizeAdmin.bind(authMiddleware), ProductController.deleteProduct);


// Payment Method Routes
router.post('/payment-method/create', authMiddleware.authorizeAdmin.bind(authMiddleware), PaymentMethodController.createPaymentMethod);
router.get('/payment-methods', authMiddleware.authorizeAdmin.bind(authMiddleware), PaymentMethodController.getAllPaymentMethods);
router.get('/payment-method/:id', authMiddleware.authorizeAdmin.bind(authMiddleware), PaymentMethodController.getPaymentMethodById);
router.put('/payment-method/update/:id', authMiddleware.authorizeAdmin.bind(authMiddleware), PaymentMethodController.updatePaymentMethod);
router.delete('/payment-method/delete/:id', authMiddleware.authorizeAdmin.bind(authMiddleware), PaymentMethodController.deletePaymentMethod);

// Order Routes
router.get('/orders', adminOrderController.handleRequest.bind(adminOrderController));
router.get('/order/:orderId',authMiddleware.authorizeAdmin.bind(authMiddleware), adminOrderController.getOrderById.bind(adminOrderController));
router.post('/order/status', authMiddleware.authorizeAdmin.bind(authMiddleware), adminOrderController.updateOrderStatus.bind(adminOrderController));
router.get('/orders/total-amount',authMiddleware.authenticate.bind(authMiddleware), adminOrderController.getTotalOrderAmount.bind(adminOrderController));
router.get('/orders/total-sales',authMiddleware.authenticate.bind(authMiddleware), adminOrderController.getTotalSales.bind(adminOrderController));
router.get('/orders/by-month',authMiddleware.authenticate.bind(authMiddleware), adminOrderController.getMonthlyOrderTotals.bind(adminOrderController));

// Complaint Routes
router.get('/complaints',authMiddleware.authenticate.bind(authMiddleware), ComplaintController.getAllComplaints);

//Client Routes
router.get('/clients/',authMiddleware.authenticate.bind(authMiddleware), clientController.getAllClients);
router.get('/client/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.getClientById);
router.put('/client/disable/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.disableClient);
router.put('/client/enable/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.enableClient);
router.delete('/client/delete/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.deleteClient);


// Admin Routes
router.post('/create',authMiddleware.authorizeAdmin.bind(authMiddleware), AdminController.createAdmin);
router.get('/',authMiddleware.authorizeAdmin.bind(authMiddleware), AdminController.getAllAdmins);
router.get('/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), AdminController.getAdminById);
router.put('/update/:id',authMiddleware.authorizeAdmin.bind(authMiddleware),AdminController.updateAdmin);
router.delete('/delete/:id',authMiddleware.authorizeAdmin.bind(authMiddleware), AdminController.deleteAdmin);
module.exports = router;