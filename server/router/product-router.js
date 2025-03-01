const Router = require('express').Router;
const productController = require('../controllers/product-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMiddleware = require('../middlewares/check-role-middleware');
const { body } = require('express-validator');

// Получение всех продуктов (доступно всем)
router.get('/', productController.getAllProducts);

// Получение продукта по ID (доступно всем)
router.get('/:id', productController.getProductById);

// Получение продуктов по категории (доступно всем)
router.get('/category/:category', productController.getProductsByCategory);

// Создание продукта (только для админов)
router.post('/',
    authMiddleware,
    checkRoleMiddleware(['admin']),
    body('title').isString().isLength({min: 3, max: 100}),
    body('description').isString().isLength({min: 10}),
    body('price').isNumeric().isFloat({min: 0}),
    body('category').isString(),
    productController.createProduct
);

// Обновление продукта (только для админов)
router.put('/:id',
    authMiddleware,
    checkRoleMiddleware(['admin']),
    body('title').optional().isString().isLength({min: 3, max: 100}),
    body('description').optional().isString().isLength({min: 10}),
    body('price').optional().isNumeric().isFloat({min: 0}),
    body('category').optional().isString(),
    productController.updateProduct
);

// Удаление продукта (только для админов)
router.delete('/:id',
    authMiddleware,
    checkRoleMiddleware(['admin']),
    productController.deleteProduct
);

module.exports = router;
