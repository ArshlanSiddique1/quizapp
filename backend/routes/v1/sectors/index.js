const { Router } = require('express');
const router = Router();


const sectorsController = require('../../../controllers/sectors/sectors.controller');
// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, sectorsController.register);
router.get('/view', sectorsController.view);
router.get('/view/:sector_id', sectorsController.viewOne);
router.put('/update/:sector_id', checkAuth, sectorsController.update);
router.patch('/update/:sector_id',checkAuth, sectorsController.update);
router.delete('/delete/:sector_id', checkAuth, sectorsController.destroy);

module.exports = router;