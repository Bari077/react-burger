import AppHeader from '../../components/App-Header/App-Header';
import { RegistrationForm } from '../../components/Forms/Registration-Form';
import { useSelector } from '../../services/hooks';
import { Navigate } from 'react-router-dom';

export function RegistrationPage(): JSX.Element {

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
                <RegistrationForm />
            </main>            
        </div>
    )
}