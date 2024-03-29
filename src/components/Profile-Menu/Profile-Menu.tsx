import profileMenuStyle from './Profile-Menu.module.css';
import { NavLink } from '../Nav-Link/Nav-Link';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { signOut } from '../../services/auth';
import { useDispatch } from '../../services/hooks';
import { FC } from "react";


export const ProfileMenu: FC =()=> {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const token = localStorage.getItem('refreshToken')
    const handleSignOut =()=> {
        token && dispatch(signOut(token)) &&
        navigate(`/login`, {state:{from: '/profile'}})
    }
    
    return (
        <div className={profileMenuStyle.menu}>
            <nav className='pb-20'>
                <Link to={{pathname : '/profile'}} className={`${profileMenuStyle.element} text text_type_main-medium ${pathname !== '/profile' ? 'text_color_inactive': profileMenuStyle.elementActive} `} >Профиль</ Link>
                <NavLink to={{pathname : '/profile/orders'}} className={`${profileMenuStyle.element} text text_type_main-medium text_color_inactive`} activeClassName={profileMenuStyle.elementActive}>История заказов</ NavLink>
                <Button htmlType='button' type='secondary' extraClass={`${profileMenuStyle.element}  text text_type_main-medium text_color_inactive`} onClick={handleSignOut}>Выход</ Button>
            </nav>
            <p className="text text_type_main-default text_color_inactive">
            {pathname === '/profile' ?
            'В этом разделе вы можете изменить свои персональные данные' : 
            'В этом разделе вы можете просмотреть свою историю заказов'}</p>
        </div>        
    )
}