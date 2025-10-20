import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;