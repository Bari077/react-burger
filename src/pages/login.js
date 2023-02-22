import AppHeader from '../components/App-Header/App-Header';
import { LoginForm } from '../components/Forms/Login-Form';

export function LoginPage() {
    return (
        <div className="App">
            <AppHeader />
            <LoginForm />
        </div>
    )
}