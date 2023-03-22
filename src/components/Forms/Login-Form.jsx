import formStyle from './Forms.module.css';
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { signIn, RESET_REQUEST_STATUS } from '../../services/actions/auth';
import { Notification } from '../Notification/Notification';
import { useLocation } from 'react-router-dom';

export const LoginForm =()=> {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = location.state?.from?.pathname ;

    const [isShowNote, setIsShowNote] = useState(false)
    const note = (<Notification onClose={()=> setIsShowNote({visible: false})}>Не удается войти, проверьте верно ли указаны почта и пароль </Notification>)  

    const [mailValue, setMailValue] = useState('');
    const inputMailRef = useRef(null);

    const [passwordValue, setPasswordValue] = useState('')
   
    
    const form = {
        "email": mailValue, 
        "password": passwordValue, 
    }; 

    
    const success = useSelector(state=> state.authReducer.success);
    const error =  useSelector(state=> state.authReducer.error) 
    
    const onChange = e => {
        setPasswordValue(e.target.value)
    }    

    const handleSubmit =(evt)=> { 
        evt.preventDefault();       
        dispatch(signIn(form));                                                                   
    }

    const handleError = useCallback(()=> {
        setIsShowNote({visible: true});
        dispatch({type : RESET_REQUEST_STATUS});
        setTimeout(()=> setIsShowNote({visible: false}), 3000);
    }, [dispatch]) 

    useEffect(()=> {
        error && handleError();
    }, [error, handleError])

    useEffect(()=> {
        success && navigate(location.state ? redirect : '/') ;
        dispatch({type : RESET_REQUEST_STATUS});
    }, [success, navigate])

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
            {isShowNote.visible && note} 
        </form>
    )
}