const { Router } = require('express');
const router = Router();


const sectionsController = require('../../../controllers/sections/sections.controller');
// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, sectionsController.register);
router.get('/view', sectionsController.view);
router.get('/view/:section_id', sectionsController.viewOne);
router.put('/update/:section_id', checkAuth, sectionsController.update);
router.patch('/update/:section_id', checkAuth, sectionsController.update);
router.delete('/delete/:section_id', checkAuth, sectionsController.destroy);

module.exports = router;