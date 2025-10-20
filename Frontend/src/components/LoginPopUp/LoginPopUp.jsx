import React, {use, useState} from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const LoginPopUp = ({setShowLogin}) => {

    const [currState, setCurrState] = React.useState("Login");
    const {token,setToken} = React.useContext(StoreContext);

    useEffect(() => {
    }, [token]);

    const navigate =  useNavigate();

    const [data,setData] = useState({
      name :"",
      email :"",
      password :""
    })

    const onChangeHandler = (e)=>{
      const name = e.target.name; 
      const value = e.target.value;
      setData({...data,[name]:value})
    } 


    const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const payload = { name: data.name, email: data.email, password: data.password };


    const url = currState === "Login" ? "http://localhost:4000/api/user/login" : "http://localhost:4000/api/user/register";

    try{
      const response = await axios.post(`${url}`,payload);
      if(response.data.success){
      if(currState === "Signup"){
        toast.success("Registration Successful. Please Login.");
        setCurrState("Login");
      }else{
        toast.success("Login Successful");
        console.log(response.data);
        const token = response.data?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          setToken(token);
          setShowLogin(false);
        } else {
          console.error('Token missing in response', response);
          toast.error('Login failed: token missing');
        } 
      }
    }

  }catch(error){
      console.log('not done',error)
    }

  }



  return (
    <div className='login-popup'>
      <form  onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState === "Login" ? <></> : <input type='text' value={data.name} name="name" onChange={onChangeHandler} placeholder='Your Name' required />}
            <input type="email" value={data.email} name="email" onChange={onChangeHandler} placeholder='Your Email' required />
            <input type="password" value={data.password} name="password" onChange={onChangeHandler}  placeholder='Password' required />
        </div>
        <button type='submit '>{currState === "Signup" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing you agree to our Terms of Service and Privacy Policy</p>
       
        </div>
        {currState === "Login" ?
         <p>Create a new Account ? <span onClick={()=>setCurrState("Signup")}>Click Here</span></p> 
        : <p>Already have an Account ? <span onClick={()=>setCurrState("Login")}>Login</span></p>}
      </form>
    </div>  
  )
}

export default LoginPopUp
