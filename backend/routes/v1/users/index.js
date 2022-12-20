const { Router } = require("express");
const router = Router();

const UserController = require('../../../controllers/users/users.controller');

// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/view', userAuth, UserController.view);
router.put('/update/:user_id', userAuth, UserController.update);
router.patch('/update/:user_id', userAuth, UserController.update);
router.delete('/delete/:delete_id', userAuth, UserController.destroy);

module.exports = router;