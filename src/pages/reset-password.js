import AppHeader from '../components/App-Header/App-Header';
import { ResetPasswordForm } from '../components/Forms/Reset-Password-Form';


export function ResetPasswordPage() {
    return (
        <div className="App">
            <AppHeader />
            <ResetPasswordForm />            
        </div>
    )
}