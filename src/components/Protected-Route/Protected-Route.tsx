import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { FC } from "react";
import { getUserInfo } from "../../services/auth";


interface IProtectedElement {
    element: JSX.Element 
}

export const ProtectedRouteElement: FC<IProtectedElement> = ({element})=> {    
    
    const isUserLoaded = useSelector(state=> state.authReducer.isUserLoaded);
    const userInfo = useSelector(state=> state.authReducer.user);
    const pathname = useLocation();    
  
    
    return (
        <>
            {isUserLoaded &&
            (userInfo ? element : <Navigate to="/login" state={{from: pathname}} replace/>)}
        </>
          
    )      
    
}
