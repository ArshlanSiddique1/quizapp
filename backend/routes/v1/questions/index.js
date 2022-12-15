const { Router } = require('express');
const router = Router();


const questionsController = require('../../../controllers/questions/questions.controller');
// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', checkAuth, questionsController.register);
router.get('/view', questionsController.view);
router.get('/view/:question_id', questionsController.viewOne);
router.put('/update/:question_id', checkAuth, questionsController.update);
router.patch('/update/:question_id', checkAuth, questionsController.update);
router.delete('/delete/:question_id', checkAuth, questionsController.destroy);

module.exports = router;