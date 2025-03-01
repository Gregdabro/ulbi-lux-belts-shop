const productService = require('../service/product-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await productService.getAllProducts();
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getProductsByCategory(req, res, next) {
        try {
            const { category } = req.params;
            const products = await productService.getProductsByCategory(category);
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async createProduct(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            
            const productData = req.body;
            const product = await productService.createProduct(productData);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            
            const { id } = req.params;
            const productData = req.body;
            const product = await productService.updateProduct(id, productData);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const result = await productService.deleteProduct(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();
