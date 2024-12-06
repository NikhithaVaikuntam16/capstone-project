import express from "express";
import { getProductDetails, getProducts, getStockAvailability, updateStock } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductDetails);
router.get("/:id/stock", getStockAvailability);
router.put("/update-stock", updateStock);

export default router;