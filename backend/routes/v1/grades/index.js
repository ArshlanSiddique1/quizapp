const { Router } = require('express');
const router = Router();


const gradesController = require('../../../controllers/grades/grades.controller');
// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, gradesController.register);
router.get('/view', gradesController.view);
router.get('/view/:grade_id', gradesController.viewOne);
router.put('/update/:grade_id', checkAuth, gradesController.update);
router.patch('/update/:grade_id', checkAuth, gradesController.update);
router.delete('/delete/:grade_id', checkAuth, gradesController.destroy);

module.exports = router;