import AppHeader from '../components/App-Header/App-Header';
import { RegistrationForm } from '../components/Forms/Registration-Form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getUserInfo } from '../services/actions/auth';
import { Navigate } from 'react-router-dom';

export function RegistrationPage() {

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
                <RegistrationForm />
            </main>            
        </div>
    )
}