import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


//login user

//steps
//take email and password from req.body
// find user by email from db
// comparre password with hashed password using bcrypt 
// if correft then send user in response
//login successfull

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
    });
}


export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message : "User does not exist"});
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch){
            return res.status(400).json({success:false, message : "Invalid credentials"});
        }
    
        const token = generateToken(user._id);
    
        res.status(200).json({success:true, message : "Login successful", data : {user, token}});
        
    
    } catch (error) {
        console.log("Error in user login", error);
        res.status(500).json({success:false, message : "Failed to login user", error});
    }
}



//register user
export const registerUser = async (req,res)=>{
    
    const {name,email,password} = req.body;
    try{

        //checking user already exists
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message : "User already exists"});
        }

        //validating email & password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please enter a valid email"});
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password must be at least 6 characters long"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name : name,
            email : email,
            password : hashedPassword
        })

        const user = await newUser.save();

        const token = generateToken(user._id);
        res.status(201).json({success:true, message : "User registered successfully", data : {user, token}});
    }
    catch(error){
        console.log("Error in user registration", error);
        res.status(500).json({success:false, message : "Failed to register user", error});
    }
}   


