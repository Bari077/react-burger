import AppHeader from '../components/App-Header/App-Header';
import { ForgotPasswordForm } from '../components/Forms/Forgot-Password-Form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getUserInfo } from '../services/actions/auth';
import { Navigate } from 'react-router-dom';

export function ForgotPasswordPage() {
    const userInfo = useSelector(state=> state.authReducer.user);
    const dispatch = useDispatch();    
    
    useEffect(()=> {
    dispatch(getUserInfo())
    }, [userInfo])

    if(userInfo) {
        return (
            <Navigate to="/" replace />
        );
    }

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <ForgotPasswordForm />
            </main>            
        </div>
    )
}