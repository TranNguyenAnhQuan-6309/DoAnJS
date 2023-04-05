import express from "express";
import cors from "cors";
import { sample_category, sample_product } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/product", (req, res) => {
    res.send(sample_product);
})

app.get("/api/product/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const product = sample_product
    .filter(product => product.product_name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
    res.send(product);
})

app.get("/api/product/category", (req, res) => {
    res.send(sample_category);
})

app.get("/api/product/category/:category_name",(req, res) => {
    const categoryName = req.params.category_name;
    const product = sample_product
    .filter(product => product.category_na?.includes(categoryName));
    res.send(product);
})

app.get("/api/product/:product_id", (req,res) => {
    const productId = req.params.product_id;
    const product = sample_product.find(product => product.product_id == productId);
    res.send(product);
})

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})