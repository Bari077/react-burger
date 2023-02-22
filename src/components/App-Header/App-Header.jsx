import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

import appHeaderStyle from './App-Header.module.css';

function AppHeader() {      

    const { pathname } = useLocation();
    const textClass = 'text text_type_main-default pl-2';

    return (
        <header className={appHeaderStyle.header}>
            <div className={appHeaderStyle.container}>                    
                <div className={appHeaderStyle.logo}>
                    <Logo />
                </div>
                <nav className={appHeaderStyle.menu}>
                    <li className={appHeaderStyle.element}>
                        <NavLink to={{ pathname: `/` }} className={appHeaderStyle.link} >
                            <BurgerIcon type={pathname === `/` ? "primary" : "secondary"}/>
                            <p className={ pathname === `/` ? textClass : `${textClass} text_color_inactive`}>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={appHeaderStyle.element}>
                        <NavLink to={{ pathname: `/orderlist` }} className={appHeaderStyle.link}>
                            <ListIcon type={pathname === `/orderlist` ? "primary" : "secondary"} />
                            <p className={ pathname === `/orderlist` ? textClass : `${textClass} text_color_inactive`}>Лента заказов</p>
                        </NavLink>                        
                    </li>
                </nav>                    
                <div className={appHeaderStyle.element}>
                    <NavLink to={{ pathname: `/login` }} className={appHeaderStyle.link}>
                        <ProfileIcon type={pathname === `/login` ? "primary" : "secondary"} />
                        <p className={ pathname === `/login` ? textClass : `${textClass} text_color_inactive`}>Личный кабинет</p>
                    </NavLink>
                </div>
            </div>                
        </header>
    )
}


export default AppHeader;