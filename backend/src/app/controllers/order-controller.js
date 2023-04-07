const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const orderAct = require('../action/order-action');
const path = './uploads/receipts/';
const uuid = require('uuid');

router.post('/', async(request, response) => {
    try {
        const order = new Order(request.body);
        order.orderDate = new Date();
        const addedOrder = await orderLogic.addOrder(order);

        const fileName = uuid.v4();
        const receiptContent = await orderAct.receiptContent(order);
        const receipt = await orderAct.createReceipt(path + fileName + ".txt", receiptContent);
        response.json({ order: addedOrder, file: receipt });
    } catch (error) {
        response.status(500).send(error.message);
    }
});
router.get('/get-all-orders', async(request, response) => {
    try {
        const orders = await orderAct.getAllOrders();
        response.json(orders);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.get('/get-receipt/:name', async(request, response) => {
    try {
        const file = path + request.params.name;
        response.download(file, 'receipt.txt');
    } catch (error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;


router.get('/get-all-categories', async(request, response) => {
    try {
        const categories = await adminAct.getAllCategories();
        response.json(categories);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;