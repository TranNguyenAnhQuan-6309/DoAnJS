const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productsAct = require('../action/product-action');
const fs = require('fs');

router.get('/get-all-products', async(request, response) => {
    try {
        const products = await productsAct.getAllProducts();
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/search-product/:productname', async(request, response) => {
    try {
        const name = request.params.productname;
        const result = await productsAct.searchProduct(name);
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/image/:name', async(request, response) => {
    try {
        const name = request.params.name;
        fs.readFile('../backend/uploads/image/' + name, (err, data) => {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;