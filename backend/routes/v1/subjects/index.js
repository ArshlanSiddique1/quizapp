const { Router } = require('express');
const router = Router();


const subjectsController = require('../../../controllers/subjects/subjects.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', userAuth, subjectsController.register);
router.get('/', subjectsController.view);
router.get('/:subject_id', subjectsController.viewOne);
router.put('/:subject_id', userAuth, subjectsController.update);
router.patch('/:subject_id', userAuth, subjectsController.update);
router.delete('/:subject_id', userAuth, subjectsController.destroy);

module.exports = router;