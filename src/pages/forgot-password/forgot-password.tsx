import AppHeader from '../../components/App-Header/App-Header';
import { ForgotPasswordForm } from '../../components/Forms/Forgot-Password-Form';
import { useSelector } from '../../services/hooks';
import { Navigate } from 'react-router-dom';

export function ForgotPasswordPage(): JSX.Element {
    const userInfo = useSelector(state=> state.authReducer.user);
    

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