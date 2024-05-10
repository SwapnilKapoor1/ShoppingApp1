import React from "react";
import { Link } from "react-router-dom";
import style from "./login.module.css";
import { useLogIn } from "../../context/login.context";

export function SignIn(){
    const{handleLogin,emailRef,passRef}=useLogIn();
    return(
        <div className={style.container}>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
        <input  type="email" placeholder="Enter Email" ref={emailRef} required/>
        <input  type="password" placeholder="Enter Password" ref={passRef} required/>
        <button className={style.Button} type="submit">Sign In</button>
        </form>
        <p><Link to="/signup">Or Sign Up Instead</Link></p>
        </div>
    );
} 