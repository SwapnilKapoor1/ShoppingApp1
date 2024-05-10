import { createContext, useContext, useEffect, useState } from "react";
import { useCheck } from "./check.context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const cartContext= createContext();
function useCart(){
    return useContext(cartContext);
}
const getCart=async(loggedInUser)=>{
    const userDocRef = doc(db, "Users", loggedInUser);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.data().cart;
}
function CustomCart({children}){
    const [cart,setCart]=useState([]);
    const [price,setPrice]=useState(0);
    const{loggedInUser}=useCheck();
    useEffect(() => {
        if (loggedInUser) {
            getCart(loggedInUser).then((cartData) => {
                setCart(cartData);
            }).catch(error => {
                console.error("Error fetching cart data:", error);
            });
        }
    }, [loggedInUser]);
    useEffect(() => {
        let totalPrice = 0;
        // Calculate total price from cart items
        cart.forEach(item => {
            totalPrice += item.price * item.qty;
        });
        setPrice(totalPrice);
    }, [cart]);
  
    return(
        <cartContext.Provider value={{cart,setCart,price,setPrice}}>
            {children}
        </cartContext.Provider>
    )
}

export {CustomCart,useCart,getCart};