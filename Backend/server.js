import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import "dotenv/config";

 
//app config
const app = express();

//PORT
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//dbconnect
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    })
}
)
.catch((error)=>{
    console.error("Error starting server:", error);
    process.exit(1);
});

//api endpoints

//food
app.use("/api/food",foodRouter);


//user
app.use("/api/user",userRouter);

app.use("/images",express.static('uploads'));


app.get("/",(req,res)=>{
    res.send("Api Working");
})



