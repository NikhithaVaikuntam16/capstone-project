import { getAllCategories } from "../models/categoriesModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        if(categories.length > 0) {
            return res.status(200).json({categories});
        }else {
            return res.status(400).json({message: "No categories found"});
        }
    }catch(err) {
        return res.status(500).json("Something went wrong");
    }
};