import express from "express";
import passport from "../config/passport.js";
import { getCart, addToCart, syncCart, deleteItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", passport.authenticate('jwt', {session : false}), getCart);
router.post("/", passport.authenticate('jwt', {session : false}), addToCart);
router.post("/sync", passport.authenticate('jwt', {session : false}), syncCart);
router.delete("/:id", passport.authenticate('jwt', {session : false}), deleteItem);

export default router;