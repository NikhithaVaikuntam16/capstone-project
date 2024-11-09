import { getProductsByCategoryId } from "../models/productsModel.js";

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