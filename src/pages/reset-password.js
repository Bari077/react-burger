import AppHeader from '../components/App-Header/App-Header';
import { ResetPasswordForm } from '../components/Forms/Reset-Password-Form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getUserInfo } from '../services/actions/auth';
import { Navigate, useLocation } from 'react-router-dom';

export function ResetPasswordPage() {
    const userInfo = useSelector(state=> state.authReducer.user);
    const dispatch = useDispatch();
    const location = useLocation();    
    
    useEffect(()=> {
    dispatch(getUserInfo())
    }, [userInfo])

    if(userInfo) {
        return (
            <Navigate to="/" replace />
        );
    } else if(!location.state) {
        return (
            <Navigate to="/forgot-password" replace />
        )
    }

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <ResetPasswordForm />
            </main>                        
        </div>
    )
}