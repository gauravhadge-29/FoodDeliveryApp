import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async (req,res)=>{
    try {
        const newOrder = new OrderModel({
            userID : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address,
            payment : req.body.payment
        })

        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData : {}});

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : 'inr',
                product_data : {
                    name : item.name
                },
                unit_amount : item.price*100
            },
            quantity : item.quantity            
        }))

        line_items.push({
            price_data : {
                currency : 'inr',
                product_data : {
                    name : 'Delivery Charges'
                },
                unit_amount : 2*100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({line_items:line_items,
            mode : 'payment',
            success_url : 'http://localhost:5173/verify?success=true&orderID='+newOrder._id,
            cancel_url : 'http://localhost:5173/verify?success=false&orderID='+newOrder._id,
        })


        res.json({success:true, session_url : session.url});
    } catch (error) {
        console.log("Error in placing order:", error);
        res.status(500).json({success:false, message:"Error in placing order"});
    }
}

const verifyOrder = async(req,res)=>{
 const {orderId,success} = req.body;
 try {
    if (success=="true") {
        await OrderModel.findByIdAndUpdate(orderId, {payment : true});
        res.json({success:true, message:"Payment successful"});
    }
    else{
        await OrderModel.findByIdAndDelete(orderId);
        res.json({success:false, message:"Payment failed, order cancelled"});
    }
 } catch (error) {
    console.log("Error in verifying order:",error);
    res.status(500).json({success:false, message:"Error in verifying order"});
 }
}


//users orders for frontend

const userOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({userID : req.body.userId});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log("Error in fetching user orders:", error);
        res.status(500).json({success:false, message:"Error in fetching user orders"}); 
    }
}

export {verifyOrder, placeOrder, userOrders};