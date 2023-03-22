import profileMenuStyle from './Profile-Menu.module.css';
import { NavLink } from '../Nav-Link/Nav-Link';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { signOut } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu=()=> {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleSignOut =()=> {
        dispatch(signOut(localStorage.getItem('refreshToken')))
        navigate(`/login`, {state:{from: '/profile'}})
    }
    
    return (
        <div className={profileMenuStyle.menu}>
            <nav className='pb-20'>
                <Link to={{pathname : '/profile'}} className={`${profileMenuStyle.element} text text_type_main-medium ${pathname !== '/profile' ? 'text_color_inactive': profileMenuStyle.elementActive} `} >Профиль</ Link>
                <NavLink to={{pathname : '/profile/orders'}} className={`${profileMenuStyle.element} text text_type_main-medium text_color_inactive`} activeClassName={profileMenuStyle.elementActive}>История заказов</ NavLink>
                <Button htmlType='button' type='secondary' extraClass={`${profileMenuStyle.element}  text text_type_main-medium text_color_inactive`} onClick={handleSignOut}>Выход</ Button>
            </nav>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете
            изменить свои персональные данные</p>
        </div>        
    )
}