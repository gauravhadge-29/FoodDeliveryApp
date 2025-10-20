import React, { createContext, use, useEffect } from 'react';
// import { food_list } from '../assets/assets';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState([]);

    const [token, setToken] = React.useState(localStorage.getItem('token') || null);

    const [food_list,setFoodList] = React.useState([]);

    let url = "http://localhost:4000/api/food/list";

    const getFoodList = async()=>{
        const response = await axios.get(`${url}`);
        if(response.data.success){
            setFoodList(response.data.data);
        }else{
            console.log("Failed to fetch food list");
        }
    }

    useEffect(() => {
        getFoodList();
    }, []);


    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        if (cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        }
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    useEffect(() => {
        console.log("Cart Items Updated:", cartItems);
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }

    return <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider;