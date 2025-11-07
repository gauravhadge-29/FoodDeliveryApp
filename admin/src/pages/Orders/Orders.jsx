import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching from:', `${API_URL}/api/order/list`);
      const response = await axios.get(`${API_URL}/api/order/list`);
      
      console.log("Fetch Orders Response:", response);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Orders fetched:", response.data.data);
      } else {
        const errorMsg = response.data.message || "Failed to fetch orders";
        console.error(errorMsg);
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to fetch orders";
      console.error("Error fetching orders:", error);
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async(event,orderId)=>{
    // console.log("Orderid",orderId)
    const response = await axios.post(`${API_URL}/api/order/status`,{
      orderId,
      status: event.target.value
     })
     if(response.data.success){
      await fetchOrders();
      toast.success("Status Upadted")
     }
  }

  useEffect(() => {
    fetchOrders();
  }, []);  

  return (
    <div className='order add'>
      <h2>Order Page</h2>
      <div className="order-list">
        {
          orders.map((order,index)=>{
            return (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon}alt="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item,index)=>{
                      if(index===order.items.length-1){
                        return item.name + " X " + item.quantity;
                      }else{
                        return item.name + " X " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order-item-name">{order.address.first_name+ " "+ order.address.last_name}</p>
                  <div className="order-item-address">
                    <p>{order.address.street + ", "}</p>
                    <p>{order.address.city + ", " + order.address.state + " " + order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>
                    {order.address.phone}
                  </p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>Total : ${order.amount}</p>
                <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}> 
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Orders
