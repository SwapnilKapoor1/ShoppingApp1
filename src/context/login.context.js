import { createContext, useContext, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCheck } from "./check.context";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useValue } from "./card.context";
import { ToastContainer } from "react-toastify";

const logInContext=createContext();
function useLogIn(){
    return useContext(logInContext);
}
function CustomLogIn({children}){
    const location=useLocation();
    const navigate=useNavigate();
    const{setLoggedIn,setLoggedInUser}=useCheck();
    const emailRef=useRef();
    const passRef=useRef();
    const {notify}=useValue();
   
    const handleLogin=async(e)=>{
        e.preventDefault();
        
        const user = doc(db, "Users", emailRef.current.value);
        const userSnapshot = await getDoc(user);
        if(!userSnapshot.exists()){
            notify("User doesn't exists! Please Sign Up")
        }else{
            const userData = userSnapshot.data().password;
            if(userData===passRef.current.value){
                setLoggedIn(true);
                setLoggedInUser(emailRef.current.value);
                let url;
                location.state?url=location.state.url:url="/";
                navigate(url);
            }
            else{
                notify("Invalid Credentials!")
            }
        }
        emailRef.current.value="";
        passRef.current.value="";
    }
    return(
        <>
        <logInContext.Provider value={{handleLogin,emailRef,passRef}}>
            {children}
        </logInContext.Provider>
        <ToastContainer/>
        </>
        
    )

}

export{CustomLogIn,useLogIn}