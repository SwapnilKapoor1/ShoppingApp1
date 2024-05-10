import { createContext, useContext, useState } from "react";

const checkContext = createContext();
function useCheck(){
    return useContext(checkContext);
}
function CustomCheck({children}){
    const [loggedInUser,setLoggedInUser]=useState("");
    const [loggedIn,setLoggedIn]=useState(false);
    return(
        <checkContext.Provider value={{loggedIn,setLoggedIn,loggedInUser,setLoggedInUser}}>
            {children}
        </checkContext.Provider>
        )

}
export {CustomCheck,useCheck}
