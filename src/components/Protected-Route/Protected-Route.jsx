import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({element})=> {    
    
    const isUserLoaded = useSelector(state=> state.authReducer.isUserLoaded);
    const userInfo = useSelector(state=> state.authReducer.user);
    const pathname = useLocation();


    
    if(!isUserLoaded) {
        return null
    }
    
    return userInfo ? element : <Navigate to="/login" state={{from: pathname}} replace/>;
     
    
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.node
}