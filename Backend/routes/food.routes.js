import express from "express";
import { addFood,listFood,removeFood } from "../controllers/Food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

//imageStorage 
const storage = multer.diskStorage( 
    {
        destination : "uploads/",
        filename : (req,file,cb)=>{
            return cb(null,`${Date.now()}${file.originalname}`);
        }
    }
)

foodRouter.post("/add", multer({ storage }).single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/delete/:id", removeFood);

export default foodRouter;
