import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { placeOrder,verifyOrder,userOrders } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder );
orderRouter.post('/myorders', authMiddleware, userOrders);


export default orderRouter;
