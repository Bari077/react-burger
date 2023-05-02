import formStyle from './Forms.module.css';
import { useState, useRef, FC, ChangeEvent, FormEventHandler } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, } from 'react-router-dom';
import { RESET_ERROR_STATUS } from '../../services/actions/user';
import { registerUser } from '../../services/auth';
import { Notification } from '../Notification/Notification';



export const RegistrationForm: FC =()=> {

    
    const isError = useSelector(state=> state.authReducer.isError);
    const [mailValue, setMailValue] = useState('');
    const inputMailRef = useRef<HTMLInputElement>(null);
    const [nameValue, setNamelValue] = useState('');
    const inputNameRef = useRef<HTMLInputElement>(null);
    const [passwordValue, setPasswordValue] = useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setPasswordValue(e.target.value)
    }

    const form = {
        "email": mailValue, 
        "password": passwordValue, 
        "name": nameValue 
    };    
   
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const note = (<Notification onClose={()=> dispatch({type : RESET_ERROR_STATUS})}>Ошибка регистрации</Notification>)      
   

    const handleSubmit: FormEventHandler<HTMLFormElement> =(evt)=> { 
        evt.preventDefault();       
        dispatch(registerUser(form, {onSuccess: () => navigate('/login'), onError: () => handleError()}));                                                                   
    }
   
    const handleError:()=> void = ()=> {        
        setTimeout(()=> dispatch({type : RESET_ERROR_STATUS}), 3000);
    }


    return (
        <form onSubmit={handleSubmit} className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
            <Input            
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNamelValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputNameRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <Input            
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setMailValue(e.target.value)}
            value={mailValue}
            name={'e-mail'}
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
            Зарегистрироваться
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Button htmlType="button" type="secondary" size="large" onClick={()=> navigate('/login')} extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div> 
            {isError && note}           
        </form>
    )
}