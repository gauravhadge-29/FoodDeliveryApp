import React, { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const {cartItems,food_list, removeFromCart,getTotalCartAmount,token, } = useContext(StoreContext);
  const [data,setData] = useState({
    first_name : '',
    last_name : '',
    email : '',
    street : '',
    city : '',
    state : '',
    zipcode : '',
    country : '',
    phone : ''
  })

  const onChangeHandler = (e)=>{
    setData({  
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const placeOrder = async(e)=>{
    e.preventDefault();
    console.log("Placing Order");

    let orderItems = [];
    food_list.map((item,index)=>{
      console.log("Cart Items",cartItems[item._id]);
      if(cartItems[item._id]){
        console.log("Item Added to Order",item);
        let itemInfo = item;

        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
    }
  })


  console.log("OrderItems",orderItems);

  let orderData = {
    address : data,
    items : orderItems,
    amount : getTotalCartAmount()+2,
  }

  let url = "http://localhost:4000"

  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if (response.data.success) {
    const {session_url} = response.data;
    window.location.replace(session_url);
  }else{
    alert("Error placing order");
  }

  }
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" onChange={onChangeHandler} name='first_name' value={data.first_name} placeholder='First Name'  required/>
          <input type="text" onChange={onChangeHandler} name='last_name'  value={data.last_name} placeholder='Last Name'  required/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required/>
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' required/>
         <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City'  required/>
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' required />
        </div>
         <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' required />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone'  required/>
      </div>
      <div className="place-order-right">
       <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type='submit'>
              PROCEED TO PAYMENT
            </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
