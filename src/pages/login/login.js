import AppHeader from '../../components/App-Header/App-Header';
import { LoginForm } from '../../components/Forms/Login-Form';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


export function LoginPage() {
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