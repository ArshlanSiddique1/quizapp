const { Router } = require('express');
const router = Router();


const sectionsController = require('../../../controllers/sections/sections.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', userAuth, sectionsController.register);
router.get('/', sectionsController.view);
router.get('/:section_id', sectionsController.viewOne);
router.put('/:section_id', userAuth, sectionsController.update);
router.patch('/:section_id', userAuth, sectionsController.update);
router.delete('/:section_id', userAuth, sectionsController.destroy);

module.exports = router;