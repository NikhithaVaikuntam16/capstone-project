import express from "express";
import passport from "../config/passport.js";
import { insertOrder, getOrders, getOrderDetails } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", passport.authenticate('jwt', {session : false}), insertOrder);
router.get("/", passport.authenticate('jwt', {session : false}), getOrders);
router.get("/:id", passport.authenticate('jwt', {session : false}), getOrderDetails);

export default router;