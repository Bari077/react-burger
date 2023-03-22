import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/actions/auth";
import { useSelector, useDispatch } from "react-redux";

export const ProtectedRouteElement = ({element})=> {
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useDispatch()
    const userInfo = useSelector(state=> state.authReducer.user);
    const pathname = useLocation();

    const init = ()=> {
        dispatch(getUserInfo())
        setTimeout(()=> {
            setIsUserLoaded(true)
        }, 1000)        
    }

    useEffect(()=> {
        init()
    }, [])
    
    if(!isUserLoaded) {
        return null
    }
    
    return userInfo ? element : <Navigate to="/login" state={{from: pathname}} replace/>;
     
    
}