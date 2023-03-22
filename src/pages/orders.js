import AppHeader from '../components/App-Header/App-Header';
import { ProfileMenu } from '../components/Profile-Menu/Profile-Menu';




export function OrdersPage() {
    

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <ProfileMenu />
                
            </main>            
        </div>
    )
}