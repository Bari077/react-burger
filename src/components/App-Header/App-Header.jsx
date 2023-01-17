import React from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';


import appHeaderStyle from './App-Header.module.css';

function AppHeader() {
    return (
        <header className={appHeaderStyle.header}>
            <div className={appHeaderStyle.container}>                    
                <div className={appHeaderStyle.logo}>
                    <Logo />
                </div>
                <nav className={appHeaderStyle.menu}>
                    <li className={appHeaderStyle.element}>
                        <BurgerIcon type="secondary"/>
                        <p style={{ color: '#8585AD' }} className="text text_type_main-default pl-2">Конструктор</p>
                    </li>
                    <li className={appHeaderStyle.element}>
                        <ListIcon type="secondary" />
                        <p style={{ color: '#8585AD' }} className="text text_type_main-default pl-2">Лента заказов</p>
                    </li>
                </nav>                    
                <div className={appHeaderStyle.element}>
                    <ProfileIcon type="secondary" />
                    <p style={{ color: '#8585AD' }} className="text text_type_main-default pl-2">Личный кабинет</p>
                </div>
            </div>                
        </header>
    )
}


export default AppHeader;