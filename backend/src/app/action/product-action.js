const Product = require('../models/product');

function getAllProducts() {
    return Product.find({}).populate("categories").exec();
}

function searchProduct(productname) {
    return Product.find({ productname: new RegExp(productname) }).exec();
}

module.exports = {
    getAllProducts,
    searchProduct
}