import React from 'react';
import style from './navbar.module.css';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCheck } from '../../context/check.context';


function Navbar(){
    const {loggedIn,setLoggedIn}=useCheck();
    return(
    <>
    <div className={style.container}>
        <Link to="/">
       <div className={style.left}> 
             <span><img src="/logo.png" alt="logo"/></span>
             <span>Busy Buy</span>
        </div>
        </Link>
        <div className={style.right}>
       
            <NavLink to="/" className={style.link} style={({isActive})=>isActive?{color:'rgb(74, 74, 189)'}:{color:'black'}}> 
            <i className="fa-solid fa-house"></i>      
            <span>Home</span>
            </NavLink>
            {loggedIn?
            <>
            <NavLink to="/orders" className={style.link} style={({isActive})=>isActive?{color:'rgb(74, 74, 189)'}:{color:'black'}}>
            <i className="fa-solid fa-basket-shopping"></i>
            <span>My Orders</span>
            </NavLink>
            <NavLink to="/cart" className={style.link} style={({isActive})=>isActive?{color:'rgb(74, 74, 189)'}:{color:'black'}}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            </NavLink>
            <NavLink to="/login"  className={style.link} style={({isActive})=>isActive?{color:'rgb(74, 74, 189)'}:{color:'black'}}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <span onClick={()=>setLoggedIn(false)}>Logout</span>
            </NavLink>
            </>:<NavLink to="/login" className={style.link} style={({isActive})=>isActive?{color:'rgb(74, 74, 189)'}:{color:'black'}}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <span>Login</span>
            </NavLink>}
        </div>
        </div>
        <div className={style.child}>
            <Outlet />
         </div>
  </>
    )
}
export default Navbar;