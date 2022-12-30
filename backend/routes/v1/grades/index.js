const { Router } = require('express');
const router = Router();


const gradesController = require('../../../controllers/grades/grades.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', gradesController.register);
router.get('/', gradesController.view);
router.get('/:grade_id', gradesController.viewOne);
router.put('/:grade_id', userAuth, gradesController.update);
router.patch('/:grade_id', userAuth, gradesController.update);
router.delete('/:grade_id', userAuth, gradesController.destroy);

module.exports = router;