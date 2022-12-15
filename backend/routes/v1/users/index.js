const { Router } = require("express");
const router = Router();

const UserController = require('../../../controllers/users/users.controller');

// Route Level Middleware - To Protect Route
const checkAuth = require("../../../middleware/auth-middleware");


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/view', checkAuth, UserController.view);
router.put('/update/:user_id', checkAuth, UserController.update);
router.patch('/update/:user_id', checkAuth, UserController.update);
router.delete('/delete/:delete_id', checkAuth, UserController.destroy);

module.exports = router;