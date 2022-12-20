const { Router } = require("express");
// const { required } = require("joi");
const router = Router();

const categoryController = require('../../../controllers/categories/categories.controller');

// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', userAuth, categoryController.register);
router.get('/', categoryController.view);
router.get('/:category_id', categoryController.viewOne);
router.put('/:category_id', userAuth, categoryController.update);
router.patch('/:category_id', userAuth, categoryController.update);
router.delete('/:category_id', userAuth, categoryController.destroy);

module.exports = router;
