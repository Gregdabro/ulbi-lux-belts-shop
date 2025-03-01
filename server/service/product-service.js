const ProductModel = require('../models/product-model');
const ProductDto = require('../dtos/product-dto');
const ApiError = require('../exceptions/api-error');

class ProductService {
    async getAllProducts() {
        const products = await ProductModel.find();
        return products.map(product => new ProductDto(product));
    }

    async getProductById(id) {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }
        return new ProductDto(product);
    }

    async getProductsByCategory(category) {
        const products = await ProductModel.find({ category });
        return products.map(product => new ProductDto(product));
    }

    async createProduct(productData) {
        const product = await ProductModel.create(productData);
        return new ProductDto(product);
    }

    async updateProduct(id, productData) {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }

        // Обновляем дату изменения
        productData.updatedAt = Date.now();

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id, 
            productData, 
            { new: true }
        );
        
        return new ProductDto(updatedProduct);
    }

    async deleteProduct(id) {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }
        
        await ProductModel.findByIdAndDelete(id);
        return { message: 'Продукт успешно удален' };
    }
}

module.exports = new ProductService();
