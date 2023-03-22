import formStyle from './Forms.module.css';
import { useState, useRef, useEffect, useCallback } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { forgotPassword, RESET_REQUEST_STATUS } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';


export const ForgotPasswordForm =()=> {    

    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const navigate = useNavigate();
    const success = useSelector(state=> state.authReducer.success); 
    const dispatch = useDispatch();
    
    const mail = { "email": value }; 

    const handleSubmit =(evt)=> { 
        evt.preventDefault();       
        dispatch(forgotPassword(mail));                                                                   
    }
    

    useEffect(()=> {
        success && navigate('/reset-password', {state:{from: '/forgot-password'}});
        dispatch({type : RESET_REQUEST_STATUS});
    }, [success, navigate])

    return (
        <form onSubmit={handleSubmit} className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
            <Input            
            type={'text'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'e-mail'}
            error={false}
            ref={inputRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />           
            <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
            Восстановить
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" onClick={()=> navigate(`/login`)} size="medium" extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div>
        </form>
    )
}