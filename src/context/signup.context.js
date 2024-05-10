import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useRef } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useValue } from "./card.context";

const signUpContext = createContext();
function useSignUp(){
    return useContext(signUpContext);
}
function CustomSignUp({children}){
    const navigate=useNavigate();
    const nameRef=useRef();
    const emailRef=useRef();
    const passRef=useRef();
    const {notify}=useValue();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const user = doc(db, "Users", emailRef.current.value);
        const userSnapshot = await getDoc(user);
        if(!userSnapshot.exists()){
        await setDoc(doc(db, "Users", emailRef.current.value),{
              name:nameRef.current.value,
              email:emailRef.current.value,
              password:passRef.current.value,
              cart:[]  
          });
          emailRef.current.value="";
          passRef.current.value="";
          nameRef.current.value="";
          notify("User Created successfully! Please login to continue")
          setTimeout(()=>navigate('/login'),2000);
        }else{
            notify("User already exists with same email!");
        }      
    }
    return(
        <signUpContext.Provider value={{handleSubmit,nameRef,emailRef,passRef}}>
            {children}
        </signUpContext.Provider>
    )
}

export {CustomSignUp,useSignUp};