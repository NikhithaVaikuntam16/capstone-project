import express from "express";
import passport from "../config/passport.js";
import { insertOrder, getOrders } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", passport.authenticate('jwt', {session : false}), insertOrder);
router.get("/", passport.authenticate('jwt', {session : false}), getOrders);

export default router;