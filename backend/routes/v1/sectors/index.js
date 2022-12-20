const { Router } = require('express');
const router = Router();


const sectorsController = require('../../../controllers/sectors/sectors.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', userAuth, sectorsController.create);
router.get('/', sectorsController.view);
router.get('/:sector_id', sectorsController.viewOne);
router.put('/:sector_id', userAuth, sectorsController.update);
router.patch('/:sector_id', userAuth, sectorsController.update);
router.delete('/:sector_id', userAuth, sectorsController.destroy);

module.exports = router;