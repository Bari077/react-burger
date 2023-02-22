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
                        <a href="#" className={appHeaderStyle.link}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default pl-2">Конструктор</p>
                        </a>
                    </li>
                    <li className={appHeaderStyle.element}>
                        <a href="#" className={appHeaderStyle.link}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                        </a>                        
                    </li>
                </nav>                    
                <div className={appHeaderStyle.element}>
                    <a href="#" className={appHeaderStyle.link}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
                    </a>
                </div>
            </div>                
        </header>
    )
}


export default AppHeader;