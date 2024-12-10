import express from "express";
import passport from "../config/passport.js";
import { insertOrder } from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", passport.authenticate('jwt', {session : false}), insertOrder);

export default router;