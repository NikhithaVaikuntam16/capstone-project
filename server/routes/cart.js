import express from "express";
import passport from "../config/passport.js";
import { getCart, addToCart, syncCart, deleteItem, deleteAll } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", passport.authenticate('jwt', {session : false}), getCart);
router.post("/", passport.authenticate('jwt', {session : false}), addToCart);
router.post("/sync", passport.authenticate('jwt', {session : false}), syncCart);
router.delete("/all", passport.authenticate('jwt', {session : false}), deleteAll);
router.delete("/:id", passport.authenticate('jwt', {session : false}), deleteItem);

export default router;