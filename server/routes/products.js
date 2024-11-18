import express from "express";
import { getProductDetails, getProducts, getStockAvailability } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductDetails);
router.get("/:id/stock", getStockAvailability);

export default router;