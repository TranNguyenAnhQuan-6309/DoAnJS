const express = require('express');
const router = express.Router();
const shoppingAct = require('../action/shopping-action');
const Cart = require('../models/cart');
const CartDetail = require('../models/cart-detail');

router.post('/create-cart', async(request, response) => {
    try {
        const cart = new Cart();
        cart.date = new Date();
        cart.userId = request.body;
        const myCart = await shoppingAct.createCart(cart);
        response.json(myCart);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/add-product', async(request, response) => {
    try {
        const product = new CartDetail(request.body);
        const checkProduct = await shoppingAct.checkIfProductExistsInCart(product);
        if (checkProduct) {
            throw 'Product already in cart !'
        }
        const addedProduct = await shoppingAct.addProduct(product);
        response.json(addedProduct);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/get-all-products', async(request, response) => {
    try {
        const cartId = request.body.cartId;
        const products = await shoppingAct.getAllProductsOfCart(cartId);
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put('/update-product', async(request, response) => {
    try {
        const oldProduct = new CartDetail(request.body);
        const product = await shoppingAct.updateProduct(oldProduct);
        if (product === null) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/remove-product/:_id', async(request, response) => {
    try {
        const _id = request.params._id;
        await shoppingAct.deleteProductFromCart(_id);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/delete-cart/:_id', async(request, response) => {
    try {
        const _id = request.params._id;
        await shoppingAct.clearCart(_id);
        await shoppingAct.deleteCart(_id);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;