const { Router } = require('express');
const router = Router();


const subjectsController = require('../../../controllers/subjects/subjects.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', userAuth, subjectsController.register);
router.get('/view', subjectsController.view);
router.get('/view/:subject_id', subjectsController.viewOne);
router.put('/update/:subject_id', userAuth, subjectsController.update);
router.patch('/update/:subject_id', userAuth, subjectsController.update);
router.delete('/delete/:subject_id', userAuth, subjectsController.destroy);

module.exports = router;