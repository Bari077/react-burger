import { FC } from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import appHeaderStyle from './App-Header.module.css';

const AppHeader: FC=()=> {    
    
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
                        <Link to={{ pathname: `/` }} className={appHeaderStyle.link} >
                            <BurgerIcon type={pathname === `/` ? "primary" : "secondary"}/>
                            <p className={ pathname === `/` ? textClass : `${textClass} text_color_inactive`}>Конструктор</p>
                        </Link>
                    </li>
                    <li className={appHeaderStyle.element}>
                        <Link to={{ pathname: `/feed` }} className={appHeaderStyle.link}>
                            <ListIcon type={pathname === `/feed` ? "primary" : "secondary"} />
                            <p className={ pathname === `/feed` ? textClass : `${textClass} text_color_inactive`}>Лента заказов</p>
                        </Link>                        
                    </li>
                </nav>                    
                <div className={appHeaderStyle.element}>
                    <Link to={{ pathname: `/profile` }} className={appHeaderStyle.link}>
                        <ProfileIcon type={pathname.startsWith('/profile') ? "primary" : "secondary"} />
                        <p className={ pathname.startsWith('/profile') ? textClass : `${textClass} text_color_inactive`}>Личный кабинет</p>
                    </Link>
                </div>
            </div>                
        </header>
    )
}

export default AppHeader;