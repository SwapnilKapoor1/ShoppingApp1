import React, { useEffect } from "react";
import style from "./cart.module.css"
import { useCart } from "../../context/cart.context";
import Card from "../../components/card/card";
import { useValue } from "../../context/card.context";
import { useOrder } from "../../context/order.context";


function Cart(){
    const {cart,price}=useCart();
    const {setPage}=useValue();
    const {handlePurchase}=useOrder();
    
    useEffect(() => {
        setPage(false);
    }, [setPage]);   
    return(
        <>
            {cart.length?
            <div>
            <div className={style.total}>
                <p>{`Total Price : ₹ ${price} `}</p>
                <button onClick={handlePurchase}>Purchase</button>
            </div>
            <div className={style.cartList}>
            {cart.map((elem)=>(
                <Card elem={elem} key={elem.id}/>
            ))}
            </div>
            </div>:<h3>The card is Empty!</h3>
            }
        </>      
    )
}
export default Cart;