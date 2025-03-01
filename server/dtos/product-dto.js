module.exports = class ProductDto {
    id;
    title;
    description;
    price;
    imageUrl;
    category;
    inStock;
    quantity;
    createdAt;
    updatedAt;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.description = model.description;
        this.price = model.price;
        this.imageUrl = model.imageUrl;
        this.category = model.category;
        this.inStock = model.inStock;
        this.quantity = model.quantity;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}
