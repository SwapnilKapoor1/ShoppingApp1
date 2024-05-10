import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage(){
    const navigate=useNavigate();
    useEffect(()=>{
            setTimeout(()=>navigate("/"),5000);
        },[navigate]);
    return(
        <>
        <h1>OOPS, Something went wrong</h1>
        <h5>You will be redirected to home page in 5 seconds</h5>
        </>
    )  
    }

export default ErrorPage;
