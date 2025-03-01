const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, default: ''},
    category: {type: String, required: true},
    inStock: {type: Boolean, default: true},
    quantity: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

module.exports = model('Product', ProductSchema);
