const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMiddleware = require('../middlewares/check-role-middleware');

router.get('/', authMiddleware, checkRoleMiddleware(['ADMIN']), userController.getUsers);

module.exports = router
