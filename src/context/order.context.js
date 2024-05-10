import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCart } from "./cart.context";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCheck } from "./check.context";
import {useNavigate } from "react-router-dom";

const orderContext = createContext();


function useOrder(){
    return useContext(orderContext);
}


function CustomOrder({children}){
    const {cart,setCart}=useCart();
    const [order,setOrder]=useState([]);
    const {loggedInUser}=useCheck();
    const navigate=useNavigate();

    const sortedOrders = (filteredOrders)=>{filteredOrders.sort((a, b) => {
        // Extract date and time strings from document names
        const dateA = a.id.split(' - ')[1].split('T')[0];
        const timeA = a.id.split('T')[1].split('.')[0];
        const dateB = b.id.split(' - ')[1].split('T')[0];
        const timeB = b.id.split('T')[1].split('.')[0];
        
        // Compare dates first
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
    
        // If dates are equal, compare times
        if (timeA < timeB) return 1;
        if (timeA > timeB) return -1;
    
        return 0; // If both dates and times are equal
    });
    return filteredOrders;
}
    
    const fetchData = useCallback( async () => {
        try {
            const collectionRef = collection(db, 'Orders');
            const querySnapshot = await getDocs(collectionRef);
            // Extract data from each document and store it in an array
            const dataArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Set the array of data in the state
            const filteredOrders = dataArray.filter(order => order.name === loggedInUser);
              // Sort orders by date in descending order
              const sortedOrder = sortedOrders(filteredOrders);
              // Set the sorted array of data in the state
              setOrder(sortedOrder);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },[loggedInUser]);
    const handlePurchase=async()=>{
        const stamp = `${loggedInUser} - ${new Date().toISOString()}`;
        await setDoc(doc(db, "Orders", stamp),{
            order:[...cart],date:new Date().toISOString().split('T')[0],name:loggedInUser
        })
         const userDocRef = doc(db, "Users", loggedInUser);
        await updateDoc(userDocRef, { cart: [] });
        setCart([]);
         fetchData();
         navigate("/orders");
    }
    useEffect(() => {
        
        fetchData();
    },[fetchData]);

   
    return(
        <orderContext.Provider value={{order,handlePurchase}}>
            {children}
        </orderContext.Provider>
    )
}

export {CustomOrder,useOrder}