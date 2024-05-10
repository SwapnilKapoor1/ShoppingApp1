import { Navigate, useLocation } from "react-router-dom";
import { useCheck } from "../context/check.context";


export const PrivateRoute = ({ children }) => {
    const{loggedIn}=useCheck();
    const location = useLocation();
    if (!loggedIn) return <Navigate to='/login' state={{url:location.pathname}} 
                            replace={true} />;
    return children;
    };