import express from 'express';
import {loginUser,registerUser} from '../controllers/user.controller.js';
const userrouter = express.Router();


userrouter.post('/login', loginUser);
userrouter.post('/register', registerUser);

export default userrouter;