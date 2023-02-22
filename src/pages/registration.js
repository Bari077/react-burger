import AppHeader from '../components/App-Header/App-Header';
import { RegistrationForm } from '../components/Forms/Registration-Form';


export function RegistrationPage() {
    return (
        <div className="App">
            <AppHeader />
            <RegistrationForm />
        </div>
    )
}