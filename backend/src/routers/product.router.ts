import {Router} from 'express';
import { sample_category, sample_product } from "../data";
import asynceHandler from 'express-async-handler';
import { ProductModel } from '../models/product.model';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const productCount = await ProductModel.countDocuments();
        if(productCount>0){
            res.send("Seed is already done!");
            return;
        }
        await ProductModel.create(sample_product);
        res.send("Seed Is Done!");
})
)

router.get("/",asynceHandler(
    async (req, res) => {
        const products = await ProductModel.find();
           res.send(products);
}
))

router.get("/search/:searchTerm",asynceHandler( 
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const products = await ProductModel.find({name: {$regex:searchRegex}})
        res.send(products);
}
))

router.get("/category_na",asynceHandler( 
    async (req, res) => {
        const category = await ProductModel.aggregate([
            {
                $unwind:'$category_na'
            },
            {
                $group:{
                    _id: '$category_na',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name: '$_category_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
          name : 'All',
          count: await ProductModel.countDocuments()
        }
        category.unshift(all);
        res.send(category);
}
))

router.get("/category/:category_name",asynceHandler(
    async(req, res) => {
        const products = await ProductModel.find({category_na: req.params.category_name})
        res.send(products);
}
))

router.get("/:product_id", asynceHandler(
    async (req,res) => {
    const product = await ProductModel.findById(req.params.product_id);
    res.send(product);
}
))

export default router;