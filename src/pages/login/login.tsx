import AppHeader from '../../components/App-Header/App-Header';
import { LoginForm } from '../../components/Forms/Login-Form';
import { useSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';


export function LoginPage(): JSX.Element {
    const userInfo = useSelector(state=> state.authReducer.user);    
    const location = useLocation();
        
    

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