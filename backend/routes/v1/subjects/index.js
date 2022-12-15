const { Router } = require('express');
const router = Router();


const subjectsController = require('../../../controllers/subjects/subjects.controller');
// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, subjectsController.register);
router.get('/view', subjectsController.view);
router.get('/view/:subject_id', subjectsController.viewOne);
router.put('/update/:subject_id', checkAuth, subjectsController.update);
router.patch('/update/:subject_id', checkAuth, subjectsController.update);
router.delete('/delete/:subject_id', checkAuth, subjectsController.destroy);

module.exports = router;