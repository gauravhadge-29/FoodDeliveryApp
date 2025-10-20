import FoodModel from "../models/FoodModel.js";
import fs from "fs";
import path from "path";

//add food item

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const Food = new FoodModel(
        {
            name : req.body.name?req.body.name:"",
            description : req.body.description?req.body.description:"",
            price : req.body.price?req.body.price:0,
            category : req.body.category?req.body.category:"",
            image : image_filename
        }
    )

    try{
        await Food.save();
        res.status(200).json({success:true, message : "Food item added successfully"});
    }catch(error){
        console.log("Error in adding food item", error);
        res.status(500).json({success:false, message : "Failed to add food item", error});
    }
}

const listFood = async (req,res)=>{
    try{
        const foodItems = await FoodModel.find();
        res.status(200).json({success:true, data : foodItems});
    }
    catch(error){
        console.log("Error in listing food items", error);
        res.status(500).json({success:false, message : "Failed to list food items", error});
    }
}

const removeFood = async (req,res)=>{
    const foodId = req.params.id;
    try{
        const foodItem = await FoodModel.findByIdAndDelete(foodId);
        if(foodItem){
            //delete image file
            const imagePath = path.join('uploads', foodItem.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                }
            }   );
            res.status(200).json({success:true, message : "Food item removed successfully"});
        }   else{
            res.status(404).json({success:false, message : "Food item not found"});
        }               
    }catch(error){      
        console.log("Error in removing food item", error);
        res.status(500).json({success:false, message : "Failed to remove food item", error});
    }
}

export {addFood, listFood, removeFood};