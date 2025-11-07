import React from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = React.useState([]);

    const {backendurl,token} = React.useContext(StoreContext);

    const fetchOrders = async()=>{
        console.log("Fetching orders with token:", token);
        const response = await axios.post(`http://localhost:4000/api/order/myorders`,{}, {headers:{token}});
        console.log("Orders response:", response.data);
        if(response.data.success){
            setData(response.data.data);
            console.log("Orders fetched:",response.data.data);
        }else{
            console.log("Failed to fetch orders");
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])



  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name+" X "+item.quantity
                            }else{
                                return item.name+" X "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
