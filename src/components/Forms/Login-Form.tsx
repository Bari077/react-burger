import formStyle from './Forms.module.css';
import { useState, useRef, FC, FormEventHandler, ChangeEvent } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { RESET_ERROR_STATUS } from '../../services/actions/user';
import { signIn } from '../../services/auth';
import { Notification } from '../Notification/Notification';
import { useLocation } from 'react-router-dom';

export const LoginForm: FC =()=> {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = location.state?.from?.pathname ;

    const isError = useSelector(state=> state.authReducer.isError);
    const note = (<Notification onClose={()=> dispatch({type: RESET_ERROR_STATUS})}>Не удается войти, проверьте верно ли указаны почта и пароль </Notification>)  

    const [mailValue, setMailValue] = useState('');
    const inputMailRef = useRef<HTMLInputElement>(null);

    const [passwordValue, setPasswordValue] = useState('')    
    
   
    
    const form = {
        "email": mailValue, 
        "password": passwordValue, 
    };      
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }    

    const handleSubmit: FormEventHandler<HTMLFormElement> =(evt)=> { 
        evt.preventDefault();       
        dispatch(signIn(form, {onSuccess: () => navigate(location.state ? redirect : '/'), onError: () => handleError()}));                                                                   
    }

    const handleError = () => {
        setTimeout(()=> dispatch({type: RESET_ERROR_STATUS}), 3000);
    } 


    return (
        <form onSubmit={handleSubmit} className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Вход</h2>
            <Input            
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setMailValue(e.target.value)}
            value={mailValue}
            name={'mail'}
            error={false}
            ref={inputMailRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={passwordValue}
                name={'password'}
                extraClass="mb-6"
            />
            <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
            Войти
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                <Button htmlType="button" type="secondary" onClick={()=> navigate(`/register`)} size="medium" extraClass={formStyle.additionalButton}>
                Зарегистрироваться
                </Button>
            </div>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Button htmlType="button" type="secondary" onClick={()=> navigate(`/forgot-password`)} size="large" extraClass={formStyle.additionalButton}>
                Восстановить пароль
                </Button>
            </div>
            {isError && note} 
        </form>
    )
}