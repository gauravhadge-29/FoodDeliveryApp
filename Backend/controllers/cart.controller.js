import UserModel from "../models/UserModel.js";


//add to cart
const addToCart = async (req, res) => {
    try {
        console.log("Add to cart request for userId:", req.body.userId, "itemId:", req.body.itemId);

        const userData = await UserModel.findById(req.body.userId);

        console.log('User Data:', userData);

        if(userData === null){
            return  res.status(404).json({ success: false, message: "User not found" });
        }
    
        let cartData = userData.cartData || {};

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        // console.log('Updated Cart Data:', cartData);

        await UserModel.findByIdAndUpdate(req.body.userId, {cartData : cartData});
        res.status(200).json({ success: true, message: "Item added to cart successfully", data : cartData });

    } catch (error) {
        console.log("Error in add to cart", error);
        res.status(500).json({ success: false, message: "Failed to add to cart", error });
    }
}



//remove from cart
const removeFromCart = async(req,res)=>{
    try {
        const userData = await UserModel.findOne({_id : req.body.userId});
    
        let cartData = userData.cartData || {};
    
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
    
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData : cartData});
        res.status(200).json({ success: true, message: "Item removed from cart successfully", data : cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to remove from cart", error });
    }
}


//fetch user cart data
const getCart = async(req,res)=>{
    try{
        console.log("Fetching cart for userId:", req.body.userId);
        const userData =  await UserModel.findOne({_id : req.body.userId});
        res.status(200).json({success:true, message : "Cart data fetched successfully", data : userData.cartData});
    }catch(error){
        res.status(500).json({ success: false, message: "Failed to fetch cart data", error });
    }
}


export { addToCart,removeFromCart,getCart };