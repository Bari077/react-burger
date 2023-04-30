import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/App-Header/App-Header';
import { ProfileMenu } from '../../components/Profile-Menu/Profile-Menu';
import style from './profile.module.css'


export function ProfilePage(): JSX.Element { 
    

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
                <div className={style.content}>
                    <ProfileMenu />
                    <Outlet />
                </div>                                
            </main>            
        </div>
    )
}