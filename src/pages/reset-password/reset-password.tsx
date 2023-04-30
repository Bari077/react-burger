import AppHeader from '../../components/App-Header/App-Header';
import { ResetPasswordForm } from '../../components/Forms/Reset-Password-Form';
import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';

export function ResetPasswordPage(): JSX.Element {
    const userInfo = useSelector(state=> state.authReducer.user);    
    const location = useLocation();    
    

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