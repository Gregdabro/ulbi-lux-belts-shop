const Router = require('express').Router;
const router = new Router();
const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const productRouter = require('./product-router');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router
