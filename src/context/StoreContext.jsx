import React, { createContext, useEffect } from 'react';
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState([]);

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}))
        }else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        if(cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}))
        }
    }

    useEffect(()=>{
        console.log("Cart Items Updated:", cartItems);
    },[cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems, 
        addToCart,
        removeFromCart
    }

    return <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider;