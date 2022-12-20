const { Router } = require('express');
const router = Router();


const sectionsController = require('../../../controllers/sections/sections.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', userAuth, sectionsController.register);
router.get('/view', sectionsController.view);
router.get('/view/:section_id', sectionsController.viewOne);
router.put('/update/:section_id', userAuth, sectionsController.update);
router.patch('/update/:section_id', userAuth, sectionsController.update);
router.delete('/delete/:section_id', userAuth, sectionsController.destroy);

module.exports = router;