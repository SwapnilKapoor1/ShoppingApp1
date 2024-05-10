import React from "react";
import style from "./signUp.module.css";
import { useSignUp } from "../../context/signup.context";

export function SignUp(){

    const {handleSubmit,nameRef,emailRef,passRef}=useSignUp();
    return(
        <div className={style.container}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <input type="name" placeholder="Enter Name" ref={nameRef} required/>
        <input type="email" placeholder="Enter Email" ref={emailRef} required/>
        <input type="password" placeholder="Enter Password" ref={passRef} required/>
        <button className={style.button}type="submit">Sign Up</button>
        </form>
        </div>
    )
}