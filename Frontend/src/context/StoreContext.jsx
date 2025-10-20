import React, { createContext, use, useEffect } from 'react';
// import { food_list } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState({});

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

    const getCartItems = async()=>{
        console.log("Fetching cart items with token:", token);
        if(token){
            const res = await axios.post("http://localhost:4000/api/cart/get",{},{
                headers :{
                    token : token
                }
            });

            console.log("Cart items response:", res.data);

            if(res.data.success){
                setCartItems(res.data.data);
            }
        }else{
            setCartItems({});
        }
    }


    useEffect(() => {
        getFoodList();
        getCartItems();
    }, []);


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if(token){
            const res = await axios.post("http://localhost:4000/api/cart/add",{
                itemId : itemId
            },{
                headers :{
                    token : token
                }
            });

            if(res.data.success) toast.success("Item added to cart");
        }
    }

    const removeFromCart = (itemId) => {
        if (cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        }
        if(token){
            axios.post("http://localhost:4000/api/cart/remove",{
                itemId : itemId
            },{
                headers :{
                    token : token
                }
            }).then((res)=>{
                if(res.data.success) toast.success("Item removed from cart");
            });
        }
        else{
            setCartItems({});
        }
    }

    const getTotalCartAmount = () => {
        try {
            let total = 0;
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    if(itemInfo){
                        total += itemInfo.price * Number(cartItems[item]);
                    }
                }
            }
            console.log("Total Cart Amount:", total);
            return total;
        } catch (error) {
            console.log("Error in calculating total cart amount:", error);
            return 0;
        }
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