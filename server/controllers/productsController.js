import { getProductsByCategoryId, getProductById } from "../models/productsModel.js";

export const getProducts = async (req, res) => {
    const categoryId = req.query.category;
    try {
        const products = await getProductsByCategoryId(categoryId);
        if(products.length > 0) {
            return res.status(200).json({products});
        }else {
            return res.status(400).json({message: "No products found"});
        }
    }catch(err) {
        return res.status(500).json("Something went wrong while fetching products");
    }
};

export const getProductDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await getProductById(id);
        if(result.length > 0) {
            return res.status(200).json({productDetails : result[0]});
        }else {
            return res.status(400).json({message: "Product details not found"});
        }
    }catch(err) {
        return res.status(500).json("Something went wrong while fetching product details");
    }
};

export const getStockAvailability = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await getProductById(id);
        if(result.length > 0) {
            return res.status(200).json({stock : result[0].stock});
        }else {
            return res.status(400).json({message: "Product not found"});
        }
    }catch(err) {
        return res.status(500).json("Something went wrong while checking stock availability");
    }
};