import formStyle from './Forms.module.css';
import { useState, useRef, FC, FormEventHandler } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/auth';
import { useDispatch } from '../../services/hooks';


export const ForgotPasswordForm: FC =()=> {    

    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const mail = { "email": value }; 

    const handleSubmit: FormEventHandler<HTMLFormElement> =(evt)=> { 
        evt.preventDefault();       
        dispatch(forgotPassword(mail, {onSuccess: ()=>navigate('/reset-password', {state:{from: '/forgot-password'}})}));                                                                   
    }
    

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