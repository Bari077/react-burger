import AppHeader from '../components/App-Header/App-Header';
import { LoginForm } from '../components/Forms/Login-Form';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../services/actions/auth';
import { Navigate, useLocation } from 'react-router-dom';


export function LoginPage() { 
    const userInfo = useSelector(state=> state.authReducer.user);
    const dispatch = useDispatch();
    const location = useLocation();    
    
    useEffect(()=> {
    dispatch(getUserInfo())
    }, [userInfo])

    if(!location.state && userInfo) {
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        
        <div className="App">
            <AppHeader />
            <main className="main">
                <LoginForm />
            </main>            
        </div>
    )
}