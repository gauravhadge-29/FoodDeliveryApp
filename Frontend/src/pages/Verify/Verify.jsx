import React from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderID = searchParams.get('orderID');
  const {backendurl} = React.useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async()=>{
    const response = await axios.post(backendurl+"/api/order/verify",{
      success : success,
      orderID : orderID
    });
    if(response.data.success){
      console.log("Payment Verified Successfully");
      navigate('/myorders');
    }else{
      console.log("Payment Verification Failed");
      navigate('/');
    }
  }

  console.log("Success:",success);
  console.log("OrderID:",orderID);

  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className="verify">
      <div className="spinner">

      </div>
      a
    </div>
  )
}

export default Verify
