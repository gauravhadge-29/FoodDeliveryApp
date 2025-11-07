import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { placeOrder,verifyOrder,userOrders,listOrders,updateStatus } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder );
orderRouter.post('/myorders', authMiddleware, userOrders);
orderRouter.get('/list',listOrders); //for admin panel
orderRouter.post('/status', updateStatus); //for admin panel

export default orderRouter;
