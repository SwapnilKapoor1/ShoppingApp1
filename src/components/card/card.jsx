import React from "react";
import style from "./card.module.css"
import { getCart, useCart } from "../../context/cart.context";
import { useValue } from "../../context/card.context";
import { useCheck } from "../../context/check.context";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";




function Card({elem}){
   const {loggedInUser}=useCheck();
   const {setCart}=useCart();
   const {page,notify}=useValue();
   const navigate=useNavigate();

   

   const handleClick = async () => {
    if(!loggedInUser){
        setTimeout(()=>navigate('/login'),2000);
        notify("Please login to continue!");
    }else{
    const userDocRef = doc(db, "Users", loggedInUser);
    const item = { ...elem, qty: 1 };

    // Check if the cart already contains an item with the same ID
    const cartSnapshot = await getDoc(userDocRef);
    const existingCartItem = cartSnapshot.data().cart.find(cartItem => cartItem.id === elem.id);

    if (existingCartItem) {
        // If item already exists, update its quantity
        const updatedCart = cartSnapshot.data().cart.map(cartItem => {
            if (cartItem.id === elem.id) {
                return { ...cartItem, qty: cartItem.qty + 1 };
            } else {
                return cartItem;
            }
        });

        // Update cart in Firestore
        await updateDoc(userDocRef, { cart: updatedCart });
        // Update cart state
        setCart(updatedCart);
    } else {
        // If item doesn't exist, add it to the cart
        await updateDoc(userDocRef, { cart: arrayUnion(item) });
        // Update cart state
        setCart(prevCart => [...prevCart, item]);
    }
    
   notify("Added to Cart");
}};

const handleAdd = async(elemId) => {
   
    const userDocRef = doc(db, "Users", loggedInUser);
    let cartFirebase;
     try{ cartFirebase=await getCart(loggedInUser);}
    catch(error){
        console.log("Error fetching:",error);
    }
    const updatedCart = cartFirebase.map(item => {
        if (item.id === elemId) {
            return {...item, qty: item.qty + 1};
        }
        return item;
    });
    
    await updateDoc(userDocRef, {
        cart: updatedCart
           });
        setCart(updatedCart);
};

const handleRemove = async(elemId) => {
    const userDocRef = doc(db, "Users", loggedInUser);
    let cartFirebase;
     try{ cartFirebase=await getCart(loggedInUser);}
    catch(error){
        console.log("Error fetching:",error);
    }
    const updatedCart = cartFirebase.map(item => {
        if (item.id === elemId && item.qty > 0) {
            return {...item, qty: item.qty - 1};
        }
        return item;
    }).filter(item => item.qty > 0); // Filter out items with quantity zero
    await updateDoc(userDocRef, {
        cart: updatedCart
           });
         setCart(updatedCart);
};

    return(
        <div className={style.container}>
            <div className={style.internal}>
            <img src={elem.images[1]} alt="productImage"/>
            <div className={style.details}>
                <p>{elem.title}</p>
                <p>₹ {elem.price}</p>
            </div>
            {page?<button onClick={handleClick} >Add to Cart</button>:
            <div className={style.add}>
                <button onClick={()=>handleAdd(elem.id)}>+</button>
                <p>{elem.qty}</p>
                <button onClick={()=>handleRemove(elem.id)}>-</button>
            </div>}
            </div>
        </div>
    )
}
export default Card;