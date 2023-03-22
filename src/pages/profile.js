import AppHeader from '../components/App-Header/App-Header';
import { ProfileForm } from '../components/Forms/Profile-Form';
import { ProfileMenu } from '../components/Profile-Menu/Profile-Menu';



export function ProfilePage() { 
    

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <ProfileMenu />
                <ProfileForm />
            </main>            
        </div>
    )
}