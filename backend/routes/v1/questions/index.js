const { Router } = require('express');
const router = Router();


const questionsController = require('../../../controllers/questions/questions.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


// Public Routes
router.post('/', userAuth, questionsController.register);
router.get('/', questionsController.view);
router.get('/:question_id', questionsController.viewOne);
router.put('/:question_id', userAuth, questionsController.update);
router.patch('/:question_id', userAuth, questionsController.update);
router.delete('/:question_id', userAuth, questionsController.destroy);

module.exports = router;