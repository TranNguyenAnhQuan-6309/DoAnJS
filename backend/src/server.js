require("./configs/database");
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");

const userController = require('./controllers/user-controller');
const productsController = require('./controllers/product-controller');
const shoppingController = require('./controllers/shopping-controller');
const orderController = require('./controllers/order-controller');
const adminController = require('./controllers/admin-controller');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use('/api/user', userController);
app.use('/api/products', productsController);
app.use('/api/shopping', shoppingController);
app.use('/api/order', orderController);
app.use('/api/admin', adminController);

app.listen(5000, () => console.log("Listening on http://localhost:5000"));