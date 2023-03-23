import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/App-Header/App-Header';
import { ProfileMenu } from '../../components/Profile-Menu/Profile-Menu';



export function ProfilePage() { 
    

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <ProfileMenu />
                <Outlet />                
            </main>            
        </div>
    )
}