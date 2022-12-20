const { Router } = require('express');
const router = Router();


const questionsController = require('../../../controllers/questions/questions.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/register', userAuth, questionsController.register);
router.get('/view', questionsController.view);
router.get('/view/:question_id', questionsController.viewOne);
router.put('/update/:question_id', userAuth, questionsController.update);
router.patch('/update/:question_id', userAuth, questionsController.update);
router.delete('/delete/:question_id', userAuth, questionsController.destroy);

module.exports = router;