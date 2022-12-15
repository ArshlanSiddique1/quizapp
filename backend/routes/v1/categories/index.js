const { Router } = require("express");
// const { required } = require("joi");
const router = Router();

const categoryController = require('../../../controllers/categories/categories.controller');

// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, categoryController.register);
router.get('/view', categoryController.view);
router.get('/view/:category_id', categoryController.viewOne);
router.put('/update/:category_id', checkAuth, categoryController.update);
router.patch('/update/:category_id', checkAuth, categoryController.update);
router.delete('/delete/:category_id', checkAuth, categoryController.destroy);

module.exports = router;
