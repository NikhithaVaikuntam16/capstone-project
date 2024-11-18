import { getProductsByCategoryId, getProductById } from "../models/productsModel.js";

export const getProducts = async (req, res) => {
    const categoryId = req.query.category;
    try {
        const products = await getProductsByCategoryId(categoryId);
        if(products.length > 0) {
            res.status(200).json({products});
        }else {
            res.status(400).json({message: "No products found"});
        }
    }catch(err) {
        res.status(500).json("Something went wrong while fetching products");
    }
};

export const getProductDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await getProductById(id);
        if(result.length > 0) {
            res.status(200).json({productDetails : result[0]});
        }else {
            res.status(400).json({message: "Product details not found"});
        }
    }catch(err) {
        res.status(500).json("Something went wrong while fetching product details");
    }
};

export const getStockAvailability = async (req, res) => {
    const {id} = req.params;
    const {quantity} = req.query;
    try {
        const result = await getProductById(id);
        if(result.length > 0) {
            res.status(200).json({availability : (result[0].stock >= parseInt(quantity))});
        }else {
            res.status(400).json({message: "Product not found"});
        }
    }catch(err) {
        res.status(500).json("Something went wrong while checking stock availability");
    }
};