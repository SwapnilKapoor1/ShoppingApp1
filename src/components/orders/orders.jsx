import React, { useEffect, useState } from "react";
import style from "./orders.module.css";

function Orders({elem}){
    const [price,setPrice]=useState(0);
    useEffect(() => {
        // Calculate total price
        let totalPrice = 0;
        elem.order.forEach(item => {
            totalPrice += item.price * item.qty;
        });
        setPrice(totalPrice);
    }, [elem.order]); 
    return(
        <div>
        <h2>{`Ordered on : ${elem.date}`}</h2>
        <table className={style.orderTable}>
            <thead>
                <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {elem.order.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>{` ₹ ${item.price*item.qty}`}</td>
                        </tr>
                    )
                })} 
                <tr>
                    <td>Total Price :</td>
                    <td></td>
                    <td></td>
                    <td><b> ₹ {price}</b></td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default Orders;