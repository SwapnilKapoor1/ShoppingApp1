import React from "react";
import style from "./order.module.css"
import { useOrder } from "../../context/order.context";
import Orders from "../../components/orders/orders";

function Order(){
    const {order}=useOrder();
    return(
        <div className={style.container}>
            <h1 className={style.heading}>Your Orders</h1>
            <div>{order.map((elem,index)=>(
                <Orders elem={elem} key={index}/>
            ))}</div>

        </div>
    )
}
export default Order;